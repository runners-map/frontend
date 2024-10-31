"use client";

import { BiCurrentLocation } from "react-icons/bi";

export default function MapCurrentLocation({ setQueryParams, map }) {
  const getCurrentLocation = () => {
    setTimeout(() => {
      map.setCenter(new Tmapv2.LatLng(37.47868927, 127.12620451));
    }, 2000);
  };

  return (
    <>
      <button
        onClick={getCurrentLocation}
        className="bg-white rounded-full w-10 h-10 flex justify-center items-center text-primary shadow-md shadow-slate-300"
      >
        <BiCurrentLocation size={30} />
      </button>
    </>
  );
}
