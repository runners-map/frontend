"use client";

import { Controller, useForm } from "react-hook-form";
import { HiMagnifyingGlass, HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState } from "react";

export default function MapSearchPOI({
  setQueryParams,
  map,
  poiMarkerArr,
  setPoiMarkerArr,
  poiSearchData,
  setPoiSearchData,
  isPoiSearched,
  setIsPoiSearched,
  createMarkerIcon,
}) {
  const { control, handleSubmit } = useForm();

  const handleSearchPOI = async (searchKeyword) => {
    try {
      const response = await axios.get(
        "https://apis.openapi.sk.com/tmap/pois",
        {
          headers: {
            appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY,
          },
          params: {
            version: 1,
            format: "json",
            searchKeyword: searchKeyword,
            resCoordType: "WGS84GEO",
            reqCoordType: "WGS84GEO",
            count: 10,
          },
        }
      );

      const resultpoisData = response.data.searchPoiInfo.pois.poi;
      setPoiSearchData(resultpoisData);

      const positionBounds = new Tmapv2.LatLngBounds();

      for (let k in resultpoisData) {
        const name = resultpoisData[k].name;

        const lat = Number(resultpoisData[k].noorLat);
        const lon = Number(resultpoisData[k].noorLon);

        const markerPosition = new Tmapv2.LatLng(lat, lon);

        const marker = new Tmapv2.Marker({
          position: markerPosition,
          icon: createMarkerIcon(String(parseInt(k) + 1), "poi"),
          iconSize: new Tmapv2.Size(40, 40),
          title: name,
          map: map,
        });

        setPoiMarkerArr((prevArr) => [...prevArr, marker]);
        positionBounds.extend(markerPosition);
      }

      map.panToBounds(positionBounds);
      map.zoomOut();

      const center = positionBounds.getCenter();
      setQueryParams((prevParams) => ({
        ...prevParams,
        centerLat: parseFloat(center._lat), // 문자열을 float으로 변환
        centerLng: parseFloat(center._lng), // 문자열을 float으로 변환
      }));
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
    }
  };

  const onSubmit = async (data) => {
    await handleSearchPOI(data.searchKeyword);
    setIsPoiSearched(true);
    const targetElement = document.getElementById("item1");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchReset = () => {
    console.log("리셋 눌림");
    setIsPoiSearched(false);
    poiMarkerArr.forEach((marker) => {
      marker.setMap(null);
      console.log("마커 제거");
    });
    setPoiMarkerArr([]);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute top-10 justify-center w-full z-10 px-6"
      >
        <Controller
          name="searchKeyword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <label className="input input-bordered input-primary flex items-center gap-2">
              <input
                {...field}
                type="text"
                className="grow"
                placeholder="검색어를 입력하세요"
              />
              <button type="submit" className="text-primary">
                <HiMagnifyingGlass size={20} style={{ strokeWidth: 1.5 }} />
              </button>
              {isPoiSearched && (
                <button
                  type="button"
                  onClick={handleSearchReset}
                  className="text-primary"
                >
                  <HiOutlineXCircle size={25} style={{ strokeWidth: 2 }} />
                </button>
              )}
            </label>
          )}
        />
      </form>
    </>
  );
}
