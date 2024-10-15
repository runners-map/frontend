'use client';
import { ReactElement, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

export default function Map() {
  const [addressInfo, setAddressInfo] = useState<ReactElement | null>(null);
  useEffect(() => {
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.567439753187976, 126.98903560638469),
      width: '100%',
      height: '700px',
      zoom: 16,
      httpsMode: true
    });
    let markerStart = null,
      markerEnd = null,
      markerWp = [],
      markerPoi = [],
      markerPoint = [],
      markerArr = [],
      lineArr = [],
      labelArr = [];
    let marker1 = new Tmapv2.Marker({
      // initTmap 내부에서 marker1 초기화
      icon: '/red-marker.png',
      iconSize: new Tmapv2.Size(24, 38),
      map: map
    });
    const tData = new Tmapv2.extension.TData();

    map.addListener('click', function onClick(evt) {
      const mapLatLng = evt.latLng;
      marker1.setMap(null); // 기존 마커 제거
      marker1 = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(mapLatLng._lat, mapLatLng._lng),
        icon: '/red-marker.png',
        offset: new Tmapv2.Point(24, 38),
        iconSize: new Tmapv2.Size(24, 38),
        map: map,
        zIndex: 1
      });

      const [lon, lat] = [mapLatLng._lng, mapLatLng._lat];

      const optionObj = {
        coordType: 'WGS84GEO',
        addressType: 'A10'
      };

      const params = {
        onComplete: function (result) {
          // 결과 처리
          const arrResult = result._responseData.addressInfo;
          const fullAddress = arrResult.fullAddress.split(',');
          const newRoadAddr = fullAddress[2];
          let jibunAddr = fullAddress[1];

          if (arrResult.buildingName !== '') {
            jibunAddr += ' ' + arrResult.buildingName;
          }

          const addressResult = (
            <div className="bg-gray-100 p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-700">새주소: {newRoadAddr}</p>
                <p className="text-sm text-gray-700">지번주소: {jibunAddr}</p>
                <p className="text-sm text-gray-700">
                  좌표 (WGS84): {lat}, {lon}
                </p>
              </div>
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="bg-primary text-white px-4 py-2 rounded"
                  onClick={() => enterDest('start', newRoadAddr, lon, lat)}>
                  출발
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded"
                  onClick={() => enterDest('end', newRoadAddr, lon, lat)}>
                  도착
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded"
                  onClick={() => enterDest('wp', newRoadAddr, lon, lat)}>
                  경유
                </button>
              </div>
            </div>
          );
          setAddressInfo(addressResult);
        },
        onProgress: function () {},
        onError: function () {
          alert('onError');
        }
      };

      tData.getAddressFromGeoJson(lat, lon, optionObj, params);
    });
    const enterDest = (type, address, x, y) => {
      if (lineArr.length > 0) {
        for (let i in lineArr) {
          lineArr[i].setMap(null);
        }
        lineArr = [];
      }

      if (markerPoint.length > 0) {
        for (let i in markerPoint) {
          markerPoint[i].setMap(null);
        }
        markerPoint = [];
      }

      let markerMessage = '';
      if (type === 'start') {
        markerMessage = '출발';
        document.getElementById('searchStartAddress').value = address; // 출발지 주소
        document.getElementById('startx').value = x; // x 좌표
        document.getElementById('starty').value = y; // y 좌표

        if (markerStart) {
          markerStart.setPosition(new Tmapv2.LatLng(y, x)); // 기존 마커 위치 업데이트
        } else {
          markerStart = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(y, x),
            icon: '/blue-marker.png',

            offset: new Tmapv2.Point(24, 38),
            iconSize: new Tmapv2.Size(24, 38),
            map: map,
            zIndex: 2
          });
        }
      } else if (type === 'end') {
        markerMessage = '도착';
        document.getElementById('searchEndAddress').value = address; // 도착지 주소
        document.getElementById('endx').value = x; // x 좌표
        document.getElementById('endy').value = y; // y 좌표

        // 도착 마커 생성 또는 업데이트
        if (markerEnd) {
          markerEnd.setPosition(new Tmapv2.LatLng(y, x)); // 기존 마커 위치 업데이트
        } else {
          // 도착 마커가 없으면 새로 생성
          markerEnd = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(y, x),
            icon: '/green-marker.png',
            offset: new Tmapv2.Point(24, 38),
            iconSize: new Tmapv2.Size(24, 38),
            map: map,
            zIndex: 2
          });
        }
      } else if (type === 'wp') {
        markerMessage = '경유';
        document.getElementById('searchWayPointAddress').value = address; // 경유지 주소
        const waypointMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(y, x),
          icon: '/purple-marker.png',
          offset: new Tmapv2.Point(24, 38),
          iconSize: new Tmapv2.Size(24, 38),
          map: map,
          zIndex: 2
        });
      }
    };
  }, []);

  return (
    <>
      <div id="map_div" className="flex relative">
        <input type="hidden" id="searchAddress" />
        <input type="hidden" id="startx" />
        <input type="hidden" id="starty" />
        <input type="hidden" id="endx" />
        <input type="hidden" id="endy" />
        <div className="flex absolute top-0 z-10 mt-2 w-full px-4">
          <div className="flex flex-col w-3/4 space-y-3">
            <div className="flex items-center relative">
              <input
                type="text"
                id="searchStartAddress"
                className="py-2 border border-gray-300 rounded-full pr-10 pl-4 w-full focus:outline-none"
                placeholder="출발지를 입력하세요"
                onKeyUp={() => onKeyupSearchPoi(this)}
              />
              <button onClick={() => clickSearchPois(this)} className="absolute right-4">
                <CiSearch />
              </button>
            </div>
            <div className="flex items-center relative">
              <input
                type="text"
                id="searchEndAddress"
                className="py-2 border border-gray-300 rounded-full pr-10 pl-4 w-full focus:outline-none"
                placeholder="도착지를 입력하세요"
                onKeyUp={() => onKeyupSearchPoi(this)}
              />
              <button onClick={() => clickSearchPois(this)} className="absolute right-4">
                <CiSearch />
              </button>
            </div>
            <div className="flex items-center relative">
              <input
                type="text"
                id="searchWayPointAddress"
                className="py-2 border border-gray-300 rounded-full pr-10 pl-4 w-full focus:outline-none"
                placeholder="경유지를 입력하세요"
                onKeyUp={() => onKeyupSearchPoi(this)}
              />
              <button onClick={() => clickSearchPois(this)} className="absolute right-4">
                <CiSearch />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center ml-1 z-10 mt-2">
            <button className="bg-gray-500 text-white rounded px-4 py-2" onClick={() => apiSearchRoutes()}>
              검색
            </button>
          </div>
        </div>
        {addressInfo && (
          <div className="absolute bottom-3 left-3 right-3 bg-white border rounded-2xl p-3 border-primary">
            {addressInfo}
          </div>
        )}
      </div>
    </>
  );
}
