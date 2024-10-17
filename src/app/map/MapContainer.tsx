"use client";

import { useEffect, useState } from "react";
import MapSearchPOI from "@/app/map/MapSearchPOI";
import MapFilter from "@/app/map/MapFilter";
import MapCurrentLocation from "@/app/map/MapCurrentLocation";
import MapPostList from "@/app/map/MapPostList";
import MapPOIList from "@/app/map/MapPOIList";

export default function MapContainer() {
  const [queryParams, setQueryParams] = useState({
    centerLat: "",
    centerLng: "",
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
  const [map, setMap] = useState(null);
  const [isListVisible, setIsListVisible] = useState(true);

  useEffect(() => {
    if (window.Tmapv2) {
      const newMap = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.570028, 126.986072),
        width: "100%",
        height: "100vh",
        zoom: 15,
        httpsMode: true,
      });

      newMap.addListener("dragstart", function () {
        setIsListVisible(false);
      });

      newMap.addListener("dragend", function () {
        const center = newMap.getCenter();
        setQueryParams((prevParams) => ({
          ...prevParams,
          centerLat: center.lat(),
          centerLng: center.lng(),
        }));
      });

      setMap(newMap);
    }
  }, []);

  const searchPosts = async () => {
    console.log("검색");
    console.log(queryParams);
    // 글 받아오기

    // 받아온 글로 마커 그리기
  };

  const toggleVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  useEffect(() => {
    searchPosts();
  }, [queryParams]);

  return (
    <>
      <div id="map_div"></div>
      <MapSearchPOI setQueryParams={setQueryParams} map={map} />
      <MapFilter queryParams={queryParams} setQueryParams={setQueryParams} />
      <MapCurrentLocation setQueryParams={setQueryParams} map={map} />
      {!isListVisible && (
        <div className="absolute w-full bottom-20 flex justify-center">
          <button className="btn btn-primary" onClick={toggleVisibility}>
            목록 보기
          </button>
        </div>
      )}
      {isListVisible && (
        <div className="carousel carousel-center w-full h-20 bottom-20 absolute space-x-2 px-2">
          <div className="carousel-item w-96 bg-white border-2 border-primary rounded-xl">
            <MapPostList />
          </div>
          <div className="carousel-item w-96 bg-white border-2 border-primary rounded-xl">
            <MapPOIList />
          </div>
        </div>
      )}
    </>
  );
}
