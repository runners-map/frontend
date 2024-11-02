'use client';

import { BiCurrentLocation } from 'react-icons/bi';

export default function MapCurrentLocation({ map }) {
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        map.setCenter(new Tmapv2.LatLng(latitude, longitude));
      });
    }
  };

  return (
    <>
      <button
        onClick={getCurrentLocation}
        className="bg-white rounded-full w-10 h-10 flex justify-center items-center text-primary shadow-md shadow-slate-300">
        <BiCurrentLocation size={30} />
      </button>
    </>
  );
}
