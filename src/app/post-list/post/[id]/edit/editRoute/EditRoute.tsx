/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MapAddress from '@/app/map-components/MapAddress';
import { FaSearch } from 'react-icons/fa';
import { usePostResponseStore } from '@/types/Post';
import { useRouter } from 'next/navigation';

export default function EditRoute({ id }: { id: string }) {
  const [addressInfo, setAddressInfo] = useState<ReactElement | null>(null);
  const { setPathResponse, setDistanceResponse, setStartPositionResponse } = usePostResponseStore();
  const router = useRouter();

  useEffect(() => {
    const map = new Tmapv2.Map('map_div', {
      center: new Tmapv2.LatLng(37.567439753187976, 126.98903560638469),
      width: '100%',
      height: '100vh',
      zoom: 16,
      httpsMode: true
    });
    let markerStart: Tmapv2.Marker | null = null;
    let markerEnd: Tmapv2.Marker | null = null;
    const markerWp: Tmapv2.Marker[] = [];
    let markerArr: Tmapv2.Marker[];
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

          setAddressInfo(<MapAddress newRoadAddr={newRoadAddr} lat={lat} lon={lon} enterDest={enterDest} />);
        },
        onProgress: function () {},
        onError: function () {
          toast.error('Error');
        }
      };

      tData.getAddressFromGeoJson(lat, lon, optionObj, params);
    });
    const enterDest = (type: 'start' | 'end' | 'wp', address: string, x: number, y: number) => {
      if (lineArr.length > 0) {
        for (const i in lineArr) {
          lineArr[i].setMap(null);
        }
        lineArr = [];
      }

      const createWayPointInput = (index: number) => {
        const searchDiv = document.getElementById('searchContainer') as HTMLDivElement;
        const hiddenDiv = document.getElementById('hiddenInput') as HTMLDivElement;

        const wpContainer = document.createElement('div');
        wpContainer.className = 'flex items-center relative';

        const wpInput = document.createElement('input');
        wpInput.type = 'text';
        wpInput.id = `searchWpAddress${index}`;
        wpInput.className =
          'py-2 border border-primary rounded-full pr-10 pl-4 w-full h-1/2 text-sm focus: outline-none';
        wpInput.value = address;

        const wpDelete = document.createElement('button');
        wpDelete.className = 'absolute top-2 right-1 h-1/2 text-sm text-black rounded-full px-2';
        wpDelete.innerText = 'X';
        wpDelete.onclick = () => {
          wpContainer.remove();

          const wpXInput = document.getElementById(`wpX${index}`) as HTMLInputElement;
          const wpYInput = document.getElementById(`wpY${index}`) as HTMLInputElement;

          if (wpXInput) {
            wpXInput.remove();
          }
          if (wpYInput) {
            wpYInput.remove();
          }

          const markerIndex = markerWp.findIndex(marker => marker._marker_data.options.title === address);
          if (markerIndex !== -1) {
            markerWp[markerIndex].setMap(null);
            markerWp.splice(markerIndex, 1);
          }
          updateWayPointIndexes(index);
        };

        const wpXInput = document.createElement('input');
        wpXInput.type = 'hidden';
        wpXInput.id = `wpX${index}`;
        wpXInput.value = x.toString();

        const wpYInput = document.createElement('input');
        wpYInput.type = 'hidden';
        wpYInput.id = `wpY${index}`;
        wpYInput.value = y.toString();

        hiddenDiv.append(wpXInput, wpYInput);
        wpContainer.append(wpInput, wpDelete);
        searchDiv.appendChild(wpContainer);
      };

      const updateWayPointIndexes = (deletedIndex: number) => {
        const xInputs = Array.from(document.querySelectorAll('input[id^="wpX"]'));
        const yInputs = Array.from(document.querySelectorAll('input[id^="wpY"]'));

        xInputs.map(input => {
          const currentIndex = parseInt(input.id.replace(/\D/g, ''));
          if (currentIndex > deletedIndex) {
            const newIndex = currentIndex - 1;
            input.id = input.id.replace(/\d+/, newIndex.toString());
          }
          return input;
        });

        yInputs.map(input => {
          const currentIndex = parseInt(input.id.replace(/\D/g, ''));
          if (currentIndex > deletedIndex) {
            const newIndex = currentIndex - 1;
            input.id = input.id.replace(/\d+/, newIndex.toString());
          }
          return input;
        });

        markerWp.forEach((marker, index) => {
          const newIndex = index + 1;

          marker.setMap(null);
          const newMarker = new Tmapv2.Marker({
            position: marker._marker_data.options.position,
            iconHTML: `
        <div>
          <img style="position: relative; width: 24px; height: 38px;" src="/purple-marker.png" style="width: 100%; height: 100%;" />
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: black; font-size: 14px; font-weight: bold;">
            ${newIndex}
          </div>
        </div>
      `,
            offset: new Tmapv2.Point(24, 38),
            iconSize: new Tmapv2.Size(24, 38),
            title: marker._marker_data.options.title,
            map: map,
            zIndex: 2
          });

          markerWp[index] = newMarker;
        });
      };

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
      } else if (type === 'wp') {
        if (markerWp.length >= 5) {
          toast.error('마커는 5개가 최대입니다');
          return;
        }
        const isDuplicate = markerWp.some(marker => {
          const title = marker._marker_data.options.title;
          return title === address;
        });

        if (isDuplicate) {
          toast.error('같은 곳에 지정할수 없습니다.');
          return;
        }

        const wpIndex = markerWp.length + 1;
        createWayPointInput(wpIndex);
        const wpMarker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(y, x),
          iconHTML: `
      <div >
        <img style="position: relative; width: 24px; height: 38px;" src="/purple-marker.png" style="width: 100%; height: 100%;" />
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; color: black; font-size: 14px; font-weight: bold;">
        ${wpIndex}
        </div>
      </div>
           `,
          offset: new Tmapv2.Point(24, 38),
          iconSize: new Tmapv2.Size(24, 38),
          title: address,
          map: map,
          zIndex: 2
        });

        markerWp.push(wpMarker);
      }
    };
    const drawRoute = () => {
      const inputStartX = document.getElementById('startx') as HTMLInputElement;
      const inputStartY = document.getElementById('starty') as HTMLInputElement;
      const inputEndX = document.getElementById('endx') as HTMLInputElement;
      const inputEndY = document.getElementById('endy') as HTMLInputElement;

      const startX = parseFloat(inputStartX.value);
      const startY = parseFloat(inputStartY.value);
      const endX = parseFloat(inputEndX.value);
      const endY = parseFloat(inputEndY.value);

      if (!startX || !startY) {
        toast.error('출발점을 정하세요.');
        return;
      }

      if (!endX || !endY) {
        toast.error('도착점을 정하세요.');
        return;
      }

      const startLatLng = new Tmapv2.LatLng(startY, startX);
      const endLatLng = new Tmapv2.LatLng(endY, endX);

      const viaPoints = [];
      for (let i = 1; i <= 5; i++) {
        const wpXInput = document.getElementById(`wpX${i}`) as HTMLInputElement;
        const wpYInput = document.getElementById(`wpY${i}`) as HTMLInputElement;
        if (wpXInput && wpYInput) {
          const viaX = parseFloat(wpXInput.value);
          const viaY = parseFloat(wpYInput.value);
          viaPoints.push(viaX + ',' + viaY);
        }
      }
      const passList = viaPoints.join('_');

      const optionObj = {
        reqCoordType: 'WGS84GEO',
        resCoordType: 'WGS84GEO',
        passList: passList
      };

      const params = {
        onComplete: function (result: any) {
          const resultData = result._responseData.features;
          console.log(resultData);
          const coordinates = resultData.map((result: any) => result.geometry.coordinates);
          const flattenCoordinates = coordinates.flatMap((coord: any) => {
            if (Array.isArray(coord[0])) {
              return coord.map((innerCoord: any) => ({
                lat: innerCoord[1],
                lng: innerCoord[0]
              }));
            } else {
              return [{ lat: coord[1], lng: coord[0] }];
            }
          });

          const totalTime = (resultData[0].properties.totalTime / 60).toFixed(0);
          const totalDistance = (resultData[0].properties.totalDistance / 1000).toFixed(1);
          console.log(flattenCoordinates);

          const routeResult = (
            <div className="flex justify-between items-center ">
              <div>{`${Math.floor(Number(totalTime) / 60) > 0 ? `${Math.floor(Number(totalTime) / 60)}시간 ` : ''}${
                Number(totalTime) % 60
              }분 | ${totalDistance}km`}</div>
              <button
                onClick={() => {
                  setStartPositionResponse(`(${startX}, ${startY})`);
                  setPathResponse(flattenCoordinates);
                  setDistanceResponse(Number(totalDistance));
                  router.push(`/post-list/post/${id}/edit`);
                }}
                className="bg-primary text-white right-0 mr-2 p-3 ml-10 rounded-full">
                수정하기
              </button>
            </div>
          );
          setAddressInfo(routeResult);

          if (lineArr.length > 0) {
            for (const line of lineArr) {
              line.setMap(null);
            }
            lineArr = [];
          }

          const jsonObject = new Tmapv2.extension.GeoJSON();
          const jsonForm = jsonObject.read(result._responseData);

          jsonObject.drawRoute(map, jsonForm, {}, function (e: any) {
            for (const m of e.markers) {
              markerArr.push(m);
            }
            for (const l of e.polylines) {
              lineArr.push(l);
            }

            const positionBounds = new Tmapv2.LatLngBounds();
            for (const polyline of e.polylines) {
              for (const latlng of polyline.getPath().path) {
                positionBounds.extend(latlng);
              }
            }

            map.panToBounds(positionBounds);
            map.zoomOut();
          });
        },
        onError: function () {
          alert('보행자 경로 - 결과 값을 가져오는 중 오류가 발생했습니다.');
        }
      };

      tData.getRoutePlanForPeopleJson(startLatLng, endLatLng, '출발지', '도착지', optionObj, params);
    };

    document.getElementById('searchRoute')!.onclick = drawRoute;
  }, [setDistanceResponse, setPathResponse, setStartPositionResponse, id, router]);

  return (
    <>
      <div id="map_div" className="flex relative">
        <button
          onClick={() => router.push(`/post-list/post/${id}/edit`)}
          className="absolute right-0 bg-red-600 text-white p-1 rounded-xl  z-20">
          수정 안하기
        </button>
      </div>
      <div id="hiddenInput">
        <input type="hidden" id="startx" />
        <input type="hidden" id="starty" />
        <input type="hidden" id="endx" />
        <input type="hidden" id="endy" />
      </div>
      <div className="flex absolute top-0 z-10 mt-2 w-full px-4">
        <div id="searchContainer" className="flex flex-col w-3/4">
          <div id="searchStart" className="flex items-center relative">
            <input
              type="text"
              id="searchStartAddress"
              className="py-2 border border-primary rounded-full pr-10 pl-4 w-full h-1/2 text-sm focus:outline-none"
              placeholder="출발지를 입력하세요"
            />
          </div>
          <div id="searchEnd" className="flex items-center relative">
            <input
              type="text"
              id="searchEndAddress"
              className="py-2 border border-primary rounded-full pr-10 pl-4 w-full h-1/2 text-sm focus:outline-none"
              placeholder="도착지를 입력하세요"
            />
          </div>
        </div>
        <div className="flex flex-col absolute right-12 top-5 justify-center items-center ml-1 z-10 mt-2">
          <button
            id="searchRoute"
            className=" bg-primary text-white rounded px-4 py-2 active:bg-blue-500 transition-colors duration-150 ease-in-out">
            <FaSearch />
          </button>
        </div>
      </div>

      {addressInfo && (
        <div className="absolute bottom-3 left-3 right-3 bg-white border rounded-2xl p-3 border-primary">
          {addressInfo}
        </div>
      )}
    </>
  );
}
