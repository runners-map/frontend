"use client";

import { Controller, useForm } from "react-hook-form";
import { HiMagnifyingGlass, HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState } from "react";

export default function MapSearchPOI({ setQueryParams, map }) {
  const { control, handleSubmit } = useForm();
  const [isSearched, setIsSearched] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [markerArr, setMarkerArr] = useState([]);

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
      setSearchData(resultpoisData);

      const positionBounds = new Tmapv2.LatLngBounds();

      for (let k in resultpoisData) {
        const name = resultpoisData[k].name;

        const lat = Number(resultpoisData[k].noorLat);
        const lon = Number(resultpoisData[k].noorLon);

        const markerPosition = new Tmapv2.LatLng(lat, lon);

        const marker = new Tmapv2.Marker({
          position: markerPosition,
          icon: "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",
          iconSize: new Tmapv2.Size(24, 38),
          title: name,
          map: map,
        });

        setMarkerArr((prevArr) => [...prevArr, marker]);
        positionBounds.extend(markerPosition);
      }

      map.panToBounds(positionBounds);
      map.zoomOut();

      const center = positionBounds.getCenter();
      setQueryParams((prevParams) => ({
        ...prevParams,
        centerLat: center._lat,
        centerLng: center._lng,
      }));
    } catch (error) {
      console.error("Error:", error.response?.status, error.response?.data);
    }
  };

  const onSubmit = async (data) => {
    await handleSearchPOI(data.searchKeyword);
    setIsSearched(true);
  };

  const handleSearchReset = () => {
    console.log("리셋 눌림");
    setIsSearched(false);
    markerArr.forEach((marker) => {
      marker.setMap(null);
      console.log("마커 제거");
    });
    setMarkerArr([]);
  };

  const handleClickList = (lat, lng) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      centerLat: lat,
      centerLng: lng,
    }));
    map.setCenter(new Tmapv2.LatLng(lat, lng));
    map.setZoom(15);
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
              {isSearched && (
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

      {isSearched && (
        <div className="w-full h-20 bg-white absolute bottom-20 overflow-y-scroll">
          <ul>
            {searchData?.map((item) => (
              <li key={item.name}>
                <div
                  onClick={() => handleClickList(item.noorLat, item.noorLon)}
                  className="border-2"
                >
                  <div>{item.name}</div>
                  <div>{item.newAddressList.newAddress[0].fullAddressRoad}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
