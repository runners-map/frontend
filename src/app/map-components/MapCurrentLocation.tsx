"use client";

import { useUserInfo } from "@/types/UserInfo";
import axios from "axios";
import { BiCurrentLocation } from "react-icons/bi";

export default function MapCurrentLocation({ setQueryParams, map }) {
  const { updateUser } = useUserInfo();
  const getCurrentLocation = () => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setQueryParams((prevParams) => ({
          ...prevParams,
          centerLat: latitude,
          centerLng: longitude,
        }));
        if (map) {
          map.setCenter(new Tmapv2.LatLng(latitude, longitude));
        }
        const lastPosition = `(${latitude}, ${longitude})`;

        try {
          await axios.put("/api/user/last-position", {
            lastPosition,
          });
          updateUser({ lastPosition });
          console.log("lastPosition 업데이트 성공");
        } catch (error) {
          console.error("lastPosition 업데이트 실패:", error);
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
        className="bg-white rounded-full w-10 h-10 flex justify-center items-center text-primary shadow-md shadow-slate-300"
      >
        <BiCurrentLocation size={30} />
      </button>
    </>
  );
}
