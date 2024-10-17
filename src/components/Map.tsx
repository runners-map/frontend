/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import { FaRunning } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

export default function Map() {
  const [addressInfo, setAddressInfo] = useState<ReactElement | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    time: string;
    startCoords: [number, number];
    endCoords: [number, number];
  }>();

  useEffect(() => {
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.567439753187976, 126.98903560638469),
      width: '100%',
      height: '700px',
      zoom: 16,
      httpsMode: true
    });
    let markerStart: Tmapv2.Marker | null = null;
    let markerEnd: Tmapv2.Marker | null = null;
    let lineArr: Tmapv2.Polyline[] = [];
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
        map: map,
        zIndex: 1
      });

      const [lon, lat] = [mapLatLng._lng, mapLatLng._lat];

      const optionObj = {
        coordType: 'WGS84GEO',
        addressType: 'A10'
      };

      const params = {
        onComplete: function (result: any) {
          const arrResult = result._responseData.addressInfo;
          const fullAddress = arrResult.fullAddress.split(',');
          const newRoadAddr = fullAddress[2];

          const addressResult = (
            <div className="bg-gray-100 p-4">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-700">도로명 주소: {newRoadAddr}</p>
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
    const enterDest = (type: 'start' | 'end', address: string, x: number, y: number) => {
      if (lineArr.length > 0) {
        for (const i in lineArr) {
          lineArr[i].setMap(null);
        }
        lineArr = [];
      }

      if (type === 'start') {
        const inputAddress = document.getElementById('searchStartAddress') as HTMLInputElement;
        const inputStartX = document.getElementById('startx') as HTMLInputElement;
        const inputStartY = document.getElementById('starty') as HTMLInputElement;

        if (inputAddress && inputStartX && inputStartY) {
          inputAddress.value = address;
          inputStartX.value = x.toString();
          inputStartY.value = y.toString();
        }

        if (markerStart) {
          markerStart.setPosition(new Tmapv2.LatLng(y, x));
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
        const inputAddress = document.getElementById('searchEndAddress') as HTMLInputElement;
        const inputEndX = document.getElementById('endx') as HTMLInputElement;
        const inputEndY = document.getElementById('endy') as HTMLInputElement;

        if (inputAddress && inputEndX && inputEndY) {
          inputAddress.value = address;
          inputEndX.value = x.toString();
          inputEndY.value = y.toString();
        }

        if (markerEnd) {
          markerEnd.setPosition(new Tmapv2.LatLng(y, x));
        } else {
          markerEnd = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(y, x),
            icon: '/green-marker.png',
            offset: new Tmapv2.Point(24, 38),
            iconSize: new Tmapv2.Size(24, 38),
            map: map,
            zIndex: 2
          });
        }
      }
    };
    const searchRoute = () => {
      const inputStartX = document.getElementById('startx') as HTMLInputElement;
      const inputStartY = document.getElementById('starty') as HTMLInputElement;
      const inputEndX = document.getElementById('endx') as HTMLInputElement;
      const inputEndY = document.getElementById('endy') as HTMLInputElement;

      const startX = parseFloat(inputStartX.value);
      const startY = parseFloat(inputStartY.value);
      const endX = parseFloat(inputEndX.value);
      const endY = parseFloat(inputEndY.value);

      const headers = {
        appKey: 'Wo234HmVII2s0a1cXxSVaaQ6RZoKjWre6YZx0WHB'
      };

      fetch('https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          startX: startX,
          startY: startY,
          endX: endX,
          endY: endY,
          reqCoordType: 'WGS84GEO',
          resCoordType: 'EPSG3857',
          startName: '출발지',
          endName: '도착지'
        })
      })
        .then(response => response.json())
        .then(data => {
          const resultData = data.features;
          if (resultData && resultData.length > 0) {
            const totalDistance = (resultData[0].properties.totalDistance / 1000).toFixed(1);
            const totalTime = (resultData[0].properties.totalTime / 60).toFixed(0);
            drawRoute(resultData);
            setRouteInfo({
              distance: totalDistance,
              time: totalTime,
              startCoords: [startX, startY],
              endCoords: [endX, endY]
            });
            const routeResult = (
              <div className="bg-gray-100 flex text-xl justify-between p-4">
                <div>
                  <div className="flex items-center ">
                    <FaRunning />
                    <p>거리: {totalDistance}km</p>
                  </div>
                  <div className="flex items-center m-0">
                    <IoMdTime />
                    <p>
                      시간:{' '}
                      {Number(totalTime) >= 60
                        ? `${Math.floor(Number(totalTime) / 60)}시간 ${Number(totalTime) % 60}분`
                        : `${Number(totalTime)}분`}
                    </p>
                  </div>
                </div>
                <Link href={'/post/create'}>
                  <button className="btn btn-primary flex items-center justify-center">설정하기</button>
                </Link>
              </div>
            );
            setAddressInfo(routeResult);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('경로 탐색 중 오류가 발생했습니다.');
        });
    };
    const drawRoute = (resultData: any) => {
      if (lineArr.length > 0) {
        for (const line of lineArr) {
          line.setMap(null);
        }
        lineArr = [];
      }
      const drawInfoArr = [];

      for (const feature of resultData) {
        const geometry = feature.geometry;
        if (geometry.type === 'LineString') {
          for (const coordinate of geometry.coordinates) {
            const latlng = new Tmapv2.Point(coordinate[0], coordinate[1]);
            const convertPoint = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
            console.log(convertPoint);
            const latLngPoint = new Tmapv2.LatLng(convertPoint._lat, convertPoint._lng);
            drawInfoArr.push(latLngPoint);
          }
        }
      }

      const polyline = new Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: '#FF0000',
        strokeWidth: 6,
        map: map
      });

      lineArr.push(polyline);
    };
    document.getElementById('searchRoute')!.onclick = searchRoute;
  }, []);

  return (
    <>
      <div id="map_div" className="flex relative">
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
              />
            </div>
            <div className="flex items-center relative">
              <input
                type="text"
                id="searchEndAddress"
                className="py-2 border border-gray-300 rounded-full pr-10 pl-4 w-full focus:outline-none"
                placeholder="도착지를 입력하세요"
              />
            </div>
          </div>
          <div className="flex justify-center items-center ml-1 z-10 mt-2">
            <button
              id="searchRoute"
              className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition duration-100 ease-in-out">
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
