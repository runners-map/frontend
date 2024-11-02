'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import MapSearchPOI from '@/app/map-components/MapSearchPOI';
import MapCurrentLocation from '@/app/map-components/MapCurrentLocation';
import MapPostList from '@/app/map-components/MapPostList';
import MapPOIList from '@/app/map-components/MapPOIList';
import MapPostDetails from '@/app/map-components/MapPostDetails';
import { HiMiniChevronUp, HiMiniChevronDown } from 'react-icons/hi2';
import { LuPencilLine } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function MapContainer() {
  const [queryParams, setQueryParams] = useState({
    centerLat: null,
    centerLng: null,
    gender: null,
    paceMinStart: null,
    paceMinEnd: null,
    distanceStart: null,
    distanceEnd: null,
    startDate: null,
    startTime: null,
    limitMemberCntStart: null,
    limitMemberCntEnd: null
  });

  const [map, setMap] = useState<Tmapv2.Map | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const [poiSearchData, setPoiSearchData] = useState(null);
  const [poiMarkerArr, setPoiMarkerArr] = useState<Tmapv2.Marker[] | null>([]);
  const [isPoiSearched, setIsPoiSearched] = useState(false);

  const [postData, setPostData] = useState(null);
  const [postMarkerArr, setPostMarkerArr] = useState<Tmapv2.Marker[] | null>([]);

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (window.Tmapv2) {
      const newMap = new Tmapv2.Map('map_div', {
        center: new Tmapv2.LatLng(37.513368311885515, 127.12366104126016),
        width: '100%',
        height: '100vh',
        zoom: 14,
        httpsMode: true
      });

      newMap.addListener('dragstart', function () {});

      newMap.addListener('dragend', function () {
        const center = newMap.getCenter();
        const centerLat = center.lat();
        const centerLng = center.lng();

        // 중심 좌표를 숫자형으로 저장
        setQueryParams(prevParams => ({
          ...prevParams,
          centerLat: parseFloat(centerLat),
          centerLng: parseFloat(centerLng)
        }));
      });

      setMap(newMap);
    }
    searchPosts();
  }, []);

  const searchPosts = async () => {
    // 마커 삭제
    if (postMarkerArr !== null) {
      postMarkerArr.forEach(marker => marker.setMap(null));
      setPostMarkerArr([]);
    }

    const params = {
      latStart: queryParams.centerLat - 1 / 105,
      latEnd: queryParams.centerLat + 1 / 105,
      lngStart: queryParams.centerLng - 1 / (105 * Math.cos(queryParams.centerLat * (Math.PI / 180))),
      lngEnd: queryParams.centerLng + 1 / (105 * Math.cos(queryParams.centerLat * (Math.PI / 180))),
      gender: queryParams.gender,
      limitMemberCntStart: queryParams.limitMemberCntStart,
      limitMemberCntEnd: queryParams.limitMemberCntEnd,
      distanceStart: queryParams.distanceStart,
      distanceEnd: queryParams.distanceEnd,
      paceMinStart: queryParams.paceMinStart,
      paceMinEnd: queryParams.paceMinEnd
    };

    console.log('실제 요청 파라미터', params);
    console.log('실제 요청 파라미터', queryParams);

    try {
      // 모든 데이터를 가져오기
      const res = await axios.get('/api/post');
      const allPosts = res.data;

      const posts = allPosts.filter(post => {
        const { lat, lng, gender, limitMemberCnt, distance, paceMin } = post;

        return (
          lat >= params.latStart &&
          lat <= params.latEnd &&
          lng >= params.lngStart &&
          lng <= params.lngEnd &&
          (params.gender === null || params.gender === '' || params.gender === gender) &&
          (params.limitMemberCntStart === null ||
            params.limitMemberCntEnd === null ||
            (limitMemberCnt >= params.limitMemberCntStart && limitMemberCnt <= params.limitMemberCntEnd)) &&
          (params.distanceStart === null ||
            params.distanceEnd === null ||
            (distance >= params.distanceStart && distance <= params.distanceEnd)) &&
          (params.paceMinStart === null ||
            params.paceMinEnd === null ||
            (paceMin >= params.paceMinStart && paceMin <= params.paceMinEnd))
        );
      });

      setPostData(posts);
      console.log('필터링된 게시글 목록', posts);

      if (posts.length > 0) {
        posts.forEach((markerData, index) => {
          const markerPosition = new Tmapv2.LatLng(markerData.lat, markerData.lng);

          const marker = new Tmapv2.Marker({
            position: markerPosition,
            icon: createMarkerIcon(index + 1, markerData.arriveYn ? 'review' : 'post'),
            iconSize: new Tmapv2.Size(40, 40),
            title: markerData.title,
            map: map
          });

          marker.addListener('touchstart', function () {
            setSelectedPost(markerData);
            setIsListVisible(true);
            const targetElement = document.getElementById('item3');
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }

            const postPath = markerData.path.map(point => new Tmapv2.LatLng(point.lat, point.lng));

            const bounds = new Tmapv2.LatLngBounds();
            postPath.forEach(latLng => bounds.extend(latLng));
            map.fitBounds(bounds);

            const currentZoom = map.getZoom();

            const pathPolyline = new Tmapv2.Polyline({
              path: postPath,
              strokeColor: '#0064FF',
              strokeWeight: 6,
              map: map
            });

            const pathStart = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(markerData.path[0].lat, markerData.path[0].lng),
              icon: createMarkerIcon('S', 'path'),
              iconSize: new Tmapv2.Size(40, 40),
              map: map
            });

            const pathEnd = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(
                markerData.path[markerData.path.length - 1].lat,
                markerData.path[markerData.path.length - 1].lng
              ),
              icon: createMarkerIcon('E', 'path'),
              iconSize: new Tmapv2.Size(40, 40),
              map: map
            });
          });

          setPostMarkerArr(prevArr => [...prevArr, marker]);
        });
      }
    } catch (error) {
      console.error('데이터 가져오기 실패', error);
    }
  };

  const toggleVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const createMarkerIcon = (index, type) => {
    let color;
    switch (type) {
      case 'post':
        color = 'rgb(74, 0, 255)'; // Post 상태일 때 색상
        break;
      case 'poi':
        color = 'rgb(0, 215, 192)'; // POI 상태일 때 색상
        break;
      case 'review':
        color = 'rgb(255 0 211)'; // Review 상태일 때 색상
        break;
      case 'path':
        color = 'rgb(0, 100, 255)';
        break;
      default:
        color = 'rgb(0, 0, 0)';
    }
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <g>
        <path d="M256,0c-85.7,0-155.2,68.2-155.2,152.2C100.8,236.3,256,512,256,512s155.2-275.7,155.2-359.8C411.2,68.2,341.7,0,256,0z" fill="${color}"/>
      </g>
      <text x="256" y="200" font-size="180" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold" dy=".3em">${index}</text>
    </svg>
  `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    searchPosts();
  }, [queryParams]);

  useEffect(() => {
    if (isPoiSearched) {
      const targetElement = document.getElementById('item1');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isPoiSearched]);

  const router = useRouter(); // useRouter 훅 사용

  const handleClick = () => {
    router.push('/post-list/post/create/searchRoute'); // 원하는 경로로 이동
  };

  return (
    <>
      <div id="map_div"></div>
      <MapSearchPOI
        setQueryParams={setQueryParams}
        map={map}
        poiMarkerArr={poiMarkerArr}
        setPoiMarkerArr={setPoiMarkerArr}
        setPoiSearchData={setPoiSearchData}
        isPoiSearched={isPoiSearched}
        setIsPoiSearched={setIsPoiSearched}
        createMarkerIcon={createMarkerIcon}
        setIsListVisible={setIsListVisible}
      />

      <div className="flex-col absolute w-full flex justify-center bottom-12 transition-transform duration-300">
        <div className="flex w-full justify-between items-center px-3">
          <MapCurrentLocation setQueryParams={setQueryParams} map={map} />
          <button
            className="btn bg-white text-primary border-0 h-10 rounded-full shadow-md shadow-slate-300"
            onClick={toggleVisibility}>
            {isListVisible ? (
              <>
                <HiMiniChevronDown size={20} style={{ strokeWidth: 1.5 }} />
                목록 숨기기
              </>
            ) : (
              <>
                <HiMiniChevronUp size={20} style={{ strokeWidth: 1.5 }} />
                목록 보기
              </>
            )}
          </button>
          <button
            onClick={handleClick}
            className="flex justify-center items-center bg-white text-primary h-10 w-10 rounded-full shadow-md shadow-slate-300">
            <LuPencilLine size={23} style={{ strokeWidth: 2.5 }} />
          </button>
        </div>

        <div
          className={`carousel carousel-center w-full h-72 space-x-1 px-4 pb-6 pt-2 overflow-x-auto transition-all duration-700 linear ${
            isListVisible ? 'max-h-72' : 'max-h-0'
          }`}>
          {isPoiSearched && (
            <div
              id="item1"
              className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500">
              <MapPOIList
                poiSearchData={poiSearchData}
                setQueryParams={setQueryParams}
                map={map}
                createMarkerIcon={createMarkerIcon}
              />
            </div>
          )}
          <div
            id="item2"
            className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500">
            <MapPostList
              postData={postData}
              setQueryParams={setQueryParams}
              map={map}
              createMarkerIcon={createMarkerIcon}
              setSelectedPost={setSelectedPost}
            />
          </div>
          {selectedPost && (
            <div
              id="item3"
              className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500">
              <MapPostDetails post={selectedPost} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
