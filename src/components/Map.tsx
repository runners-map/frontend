'use client';
import { useEffect, useState } from 'react';

export default function Map() {
  const [addressInfo, setAddressInfo] = useState('');

  const initTmap = () => {
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.567439753187976, 126.98903560638469),
      width: '100%',
      height: '700px',
      zoom: 16,
      httpsMode: true
    });
    let markerStart = null;
    let markerEnd = null;
    let markerWp = [];
    let markerPoi = [];
    let markerPoint = [];
    let markerArr = [],
      lineArr = [],
      labelArr = [];
    let marker1 = new Tmapv2.Marker({
      icon: '/red-marker.png',
      iconSize: new Tmapv2.Size(24, 38),
      map: map
    });
    const tData = new Tmapv2.extension.TData();

    map.addListener('click', function onClick(evt) {
      const mapLatLng = evt.latLng;
      marker1.setMap(null);
      marker1 = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng),
        icon: '/red-marker.png',
        offset: new Tmapv2.Point(24, 38),
        iconSize: new Tmapv2.Size(24, 38),
        map: map
      });

      const [lon, lat] = [mapLatLng._lng, mapLatLng._lat];

      const optionObj = {
        coordType: 'WGS84GEO',
        addressType: 'A10'
      };

      const params = {
        onComplete: function (result) {
          if (labelArr.length > 0) {
            for (let i in labelArr) {
              labelArr[i].setMap(null);
            }
            labelArr = [];
          }

          // poi 마커 지우기
          if (markerPoi.length > 0) {
            for (let i in markerPoi) {
              markerPoi[i].setMap(null);
            }
            markerPoi = [];
          }
          const arrResult = result._responseData.addressInfo;
          const fullAddress = arrResult.fullAddress.split(',');
          const newRoadAddr = fullAddress[2];
          let jibunAddr = fullAddress[1];

          if (arrResult.buildingName !== '') {
            jibunAddr += ' ' + arrResult.buildingName;
          }

          const addressResult = '새주소: ' + newRoadAddr;
          console.log(addressResult);
          setAddressInfo(addressResult);
        },
        onProgress: function () {},
        onError: function () {
          alert('onError');
        }
      };

      tData.getAddressFromGeoJson(lat, lon, optionObj, params);
    });
  };

  useEffect(() => {
    initTmap();
  }, []);

  return (
    <>
      <div id="map_div" className="relative">
        <div className="absolute top-0 left-0 z-10 flex-col space-y-3">
          <div className=" flex items-center">
            <input
              type="text"
              id="searchStartAddress"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="출발지를 입력하세요"
              onKeyUp={() => onKeyupSearchPoi(this)}
            />
            <button onClick={() => clickSearchPois(this)} className="ml-2 bg-blue-500 text-white rounded px-4 py-2">
              검색
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              id="searchEndAddress"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="목적지를 입력하세요"
              onKeyUp={() => onKeyupSearchPoi(this)}
            />
            <button onClick={() => clickSearchPois(this)} className="ml-2 bg-blue-500 text-white rounded px-4 py-2">
              검색
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              id="searchStartAddress"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="경유지를 입력하세요"
              onKeyUp={() => onKeyupSearchPoi(this)}
            />
            <button onClick={() => clickSearchPois(this)} className="ml-2 bg-blue-500 text-white rounded px-4 py-2">
              검색
            </button>
          </div>

          <button className="bg-gray-500 text-white rounded px-4 py-2" onClick={() => apiSearchRoutes()}>
            검색
          </button>
        </div>
      </div>
      {addressInfo && <div>{addressInfo}</div>}
    </>
  );
}
