'use client';
import { useEffect } from 'react';
export default function Map() {
  useEffect(() => {
    const initTmap = () => {
      if (window.Tmapv2) {
        const map = new Tmapv2.Map('map_div', {
          center: new Tmapv2.LatLng(37.570028, 126.986072),
          width: '100%',
          height: '700px',
          zoom: 15,
          httpsMode: true
        });
      }
    };
    initTmap();
    console.log(window.Tmapv2);
  }, []);
  return (
    <>
      <div id="map_div"></div>
    </>
  );
}
