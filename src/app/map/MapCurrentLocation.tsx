"use client";

import { BiCurrentLocation } from "react-icons/bi";

export default function MapCurrentLocation({ setQueryParams, map }) {
  const getCurrentLocation = () => {
    console.log("현재위치 받아옴");
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setQueryParams((prevParams) => ({
          ...prevParams,
          centerLat: latitude,
          centerLng: longitude,
        }));
        if (map) {
          map.setCenter(new Tmapv2.LatLng(latitude, longitude));
        }
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <>
      <button
        onClick={getCurrentLocation}
        className="bg-white rounded-full w-10 h-10 flex justify-center items-center text-primary"
      >
        <BiCurrentLocation size={30} />
      </button>
    </>
  );
}
