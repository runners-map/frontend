"use client";

import { useEffect, useState } from "react";
import MapSearchPOI from "@/app/map/MapSearchPOI";
import MapFilter from "@/app/map/MapFilter";
import MapCurrentLocation from "@/app/map/MapCurrentLocation";
import MapPostList from "@/app/map/MapPostList";
import MapPOIList from "@/app/map/MapPOIList";
import MapPostPopup from "@/app/map/MapPostPopup";
import axios from "axios";
import { HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import ReactDOMServer from "react-dom/server";

export default function MapContainer() {
  const [queryParams, setQueryParams] = useState({
    centerLat: 37.570028,
    centerLng: 126.986072,
    gender: "",
    paceMinStart: "",
    paceMinEnd: "",
    distanceStart: "",
    distanceEnd: "",
    startDate: "",
    startTime: "",
    limitMemberCnt: 10,
    page: "",
    size: "",
  });
  const [map, setMap] = useState(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const [poiSearchData, setPoiSearchData] = useState(null);
  const [poiMarkerArr, setPoiMarkerArr] = useState<Tmapv2.Marker | null>([]);
  const [isPoiSearched, setIsPoiSearched] = useState(false);

  const [postData, setPostData] = useState(null);
  const [postMarkerArr, setPostMarkerArr] = useState<Tmapv2.Marker | null>([]);

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
    if (postMarkerArr.length > 0) {
      postMarkerArr.forEach((marker) => marker.setMap(null)); // 모든 마커 삭제
      setPostMarkerArr([]); // 배열 초기화
    }

    const params = {
      lat_gte: queryParams.centerLat - 1 / 111, // 중심 위도에서 1km 남쪽
      lat_lte: queryParams.centerLat + 1 / 111, // 중심 위도에서 1km 북쪽
      lng_gte:
        queryParams.centerLng -
        1 / (111 * Math.cos(queryParams.centerLat * (Math.PI / 180))), // 중심 경도에서 1km 서쪽
      lng_lte:
        queryParams.centerLng +
        1 / (111 * Math.cos(queryParams.centerLat * (Math.PI / 180))), // 중심 경도에서 1km 동쪽
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
            icon: createMarkerIcon(index + 1, "post"), // 마커 아이콘
            iconSize: new Tmapv2.Size(40, 40), // 아이콘 크기
            title: markerData.title, // 마커의 제목 (POST의 제목)
            map: map, // 기존 맵 인스턴스
          });

          marker.addListener("click", function () {
            console.log("클릭됨");
            infoWindow.setVisible(true);
          });

          setPostMarkerArr((prevArr) => [...prevArr, marker]);
          console.log(postMarkerArr);

          // map.addListener("click", function () {
          //   infoWindow.setVisible(false);
          // });

          const content = ReactDOMServer.renderToString(<MapPostPopup />);

          const infoWindow = new Tmapv2.InfoWindow({
            position: markerPosition, //Popup 이 표출될 맵 좌표
            content: content, //Popup 표시될 text
            border: "0px solid #FF0000", //Popup의 테두리 border 설정.
            type: 2, //Popup의 type 설정.
            map: map, //Popup이 표시될 맵 객체
          });
          infoWindow.setVisible(false);
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
        <div className="flex w-full justify-between items-center px-3">
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
                className="carousel-item w-full bg-white border-2 border-primary rounded-xl  overflow-y-auto"
              >
                <MapPostList
                  postData={postData}
                  setQueryParams={setQueryParams}
                  map={map}
                  createMarkerIcon={createMarkerIcon}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
