"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MapSearchPOI from "@/app/components/MapSearchPOI";
import MapFilter from "@/app/components/MapFilter";
import MapCurrentLocation from "@/app/components/MapCurrentLocation";
import MapPostList from "@/app/components/MapPostList";
import MapPOIList from "@/app/components/MapPOIList";
import MapPostDetails from "@/app/components/MapPostDetails";
import { HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import { LuPencilLine } from "react-icons/lu";
import { useRouter } from "next/navigation";

export default function MapContainer() {
  const [queryParams, setQueryParams] = useState({
    centerLat: 0,
    centerLng: 0,
    gender: "",
    paceMinStart: "",
    paceMinEnd: "",
    distanceStart: "",
    distanceEnd: "",
    startDate: "",
    startTime: "",
    limitMemberCnt: 0,
    page: "",
    size: "",
  });

  const [map, setMap] = useState<Tmapv2.Map | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const [poiSearchData, setPoiSearchData] = useState(null);
  const [poiMarkerArr, setPoiMarkerArr] = useState<Tmapv2.Marker[] | null>([]);
  const [isPoiSearched, setIsPoiSearched] = useState(false);

  const [postData, setPostData] = useState(null);
  const [postMarkerArr, setPostMarkerArr] = useState<Tmapv2.Marker[] | null>(
    []
  );

  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (window.Tmapv2) {
      const newMap = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.570028, 126.986072),
        width: "100%",
        height: "100vh",
        zoom: 15,
        httpsMode: true,
      });

      newMap.addListener("dragstart", function () {});

      newMap.addListener("dragend", function () {
        const center = newMap.getCenter();
        const centerLat = center.lat();
        const centerLng = center.lng();

        // 중심 좌표를 숫자형으로 저장
        setQueryParams((prevParams) => ({
          ...prevParams,
          centerLat: parseFloat(centerLat),
          centerLng: parseFloat(centerLng),
        }));
      });

      setMap(newMap);
    }
    searchPosts();
  }, []);

  const searchPosts = async () => {
    // 마커 삭제
    if (postMarkerArr !== null) {
      postMarkerArr.forEach((marker) => marker.setMap(null));
      setPostMarkerArr([]);
    }

    const params = {
      lat_gte: queryParams.centerLat - 1 / 111,
      lat_lte: queryParams.centerLat + 1 / 111,
      lng_gte:
        queryParams.centerLng -
        1 / (111 * Math.cos(queryParams.centerLat * (Math.PI / 180))),
      lng_lte:
        queryParams.centerLng +
        1 / (111 * Math.cos(queryParams.centerLat * (Math.PI / 180))),
      gender: queryParams.gender,
      limitMemberCnt: queryParams.limitMemberCnt,
    };

    console.log("실제 요청 파라미터", params);

    try {
      // 모든 데이터를 가져오기
      const res = await axios.get("http://localhost:3001/Post");
      const posts = res.data;

      // 클라이언트 측에서 필터링
      const filteredPosts = posts.filter((post) => {
        const lat = parseFloat(post.lat);
        const lng = parseFloat(post.lng);
        const gender = post.gender;
        const limitMemberCnt = post.limitMemberCnt;

        return (
          lat >= params.lat_gte &&
          lat <= params.lat_lte &&
          lng >= params.lng_gte &&
          lng <= params.lng_lte &&
          (params.gender === "" || params.gender === gender) &&
          (params.limitMemberCnt === null ||
            limitMemberCnt <= params.limitMemberCnt)
        );
      });

      console.log("필터링된 결과", filteredPosts);
      setPostData(filteredPosts);

      if (filteredPosts.length > 0) {
        filteredPosts.forEach((markerData, index) => {
          const markerPosition = new Tmapv2.LatLng(
            markerData.lat,
            markerData.lng
          );

          const marker = new Tmapv2.Marker({
            position: markerPosition,
            icon: createMarkerIcon(
              index + 1,
              markerData.arriveYn ? "review" : "post"
            ),
            iconSize: new Tmapv2.Size(40, 40),
            title: markerData.title,
            map: map,
          });

          marker.addListener("touchstart", function () {
            setSelectedPost(markerData);
            setIsListVisible(true);
            const targetElement = document.getElementById("item3");
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });

          setPostMarkerArr((prevArr) => [...prevArr, marker]);
        });
      }
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  const toggleVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const createMarkerIcon = (index, type) => {
    let color;
    switch (type) {
      case "post":
        color = "rgb(74, 0, 255)"; // Post 상태일 때 색상
        break;
      case "poi":
        color = "rgb(0, 215, 192)"; // POI 상태일 때 색상
        break;
      case "review":
        color = "rgb(255 0 211)"; // Review 상태일 때 색상
        break;
      default:
        color = "rgb(0, 0, 0)";
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
      const targetElement = document.getElementById("item1");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isPoiSearched]);

  const router = useRouter(); // useRouter 훅 사용

  const handleClick = () => {
    router.push("/post/create/searchRoute"); // 원하는 경로로 이동
  };

  return (
    <>
      <div id="map_div"></div>
      <MapSearchPOI
        setQueryParams={setQueryParams}
        map={map}
        poiMarkerArr={poiMarkerArr}
        setPoiMarkerArr={setPoiMarkerArr}
        poiSearchData={poiSearchData}
        setPoiSearchData={setPoiSearchData}
        isPoiSearched={isPoiSearched}
        setIsPoiSearched={setIsPoiSearched}
        createMarkerIcon={createMarkerIcon}
      />

      <div
        className={`flex-col space-y-2 absolute w-full flex justify-center bottom-24 transition-transform duration-300 ${
          isListVisible ? "translate-y-0" : "translate-y-80"
        }`}
      >
        <div className="px-3">
          <div className="flex justify-end">
            <button
              onClick={handleClick}
              className="flex justify-center items-center bg-white text-primary h-10 w-10 rounded-full"
            >
              <LuPencilLine size={23} style={{ strokeWidth: 2.5 }} />
            </button>
          </div>
          <div className="flex w-full justify-between items-center ">
            <MapCurrentLocation setQueryParams={setQueryParams} map={map} />
            <button
              className="btn bg-white text-primary h-10"
              onClick={toggleVisibility}
            >
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
            <MapFilter
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
        </div>

        <div className="carousel carousel-center w-full h-72 space-x-1 px-4">
          {isListVisible && (
            <>
              {isPoiSearched && (
                <div
                  id="item1"
                  className="carousel-item w-full bg-white border-2 border-primary rounded-xl overflow-y-auto"
                >
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
                className="carousel-item w-full bg-white border-2 border-primary rounded-xl overflow-y-auto"
              >
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
                  className="carousel-item w-full bg-white border-2 border-primary rounded-xl"
                >
                  <MapPostDetails post={selectedPost} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
