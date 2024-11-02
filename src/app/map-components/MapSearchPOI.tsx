'use client';
import { Controller, useForm } from 'react-hook-form';
import { HiMagnifyingGlass, HiOutlineXCircle } from 'react-icons/hi2';
import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';
import MapFilter from '@/app/map-components/MapFilter';
import axios from 'axios';
import { useState } from 'react';

export default function MapSearchPOI({
  setQueryParams,
  map,
  poiMarkerArr,
  setPoiMarkerArr,
  setPoiSearchData,
  isPoiSearched,
  setIsPoiSearched,
  createMarkerIcon,
  setIsListVisible
}) {
  const { control, handleSubmit, reset } = useForm();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsListVisible(false);
  };

  const handleSearchPOI = async searchKeyword => {
    try {
      const response = await axios.get('https://apis.openapi.sk.com/tmap/pois', {
        headers: {
          appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY
        },
        params: {
          version: 1,
          format: 'json',
          searchKeyword: searchKeyword,
          resCoordType: 'WGS84GEO',
          reqCoordType: 'WGS84GEO',
          count: 10
        }
      });

      const resultpoisData = response.data.searchPoiInfo.pois.poi;
      setPoiSearchData(resultpoisData);

      const positionBounds = new Tmapv2.LatLngBounds();

      for (const k in resultpoisData) {
        const name = resultpoisData[k].name;

        const lat = Number(resultpoisData[k].noorLat);
        const lon = Number(resultpoisData[k].noorLon);

        const markerPosition = new Tmapv2.LatLng(lat, lon);

        const marker = new Tmapv2.Marker({
          position: markerPosition,
          icon: createMarkerIcon(String(parseInt(k) + 1), 'poi'),
          iconSize: new Tmapv2.Size(40, 40),
          title: name,
          map: map
        });

        setPoiMarkerArr(prevArr => [...prevArr, marker]);
        positionBounds.extend(markerPosition);
      }

      map.panToBounds(positionBounds);
      map.zoomOut();

      const center = positionBounds.getCenter();
      setQueryParams(prevParams => ({
        ...prevParams,
        centerLat: parseFloat(center._lat),
        centerLng: parseFloat(center._lng)
      }));
    } catch (error) {
      console.error('Error:', error.response?.status, error.response?.data);
    }
  };

  const onSubmit = async data => {
    await handleSearchPOI(data.searchKeyword);
    setIsPoiSearched(true);
    const targetElement = document.getElementById('item1');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchReset = () => {
    console.log('리셋 눌림');
    setIsPoiSearched(false);
    poiMarkerArr.forEach(marker => {
      marker.setMap(null);
      console.log('마커 제거');
    });
    setPoiMarkerArr([]);
    reset({ searchKeyword: '' });
  };

  return (
    <div className="flex-col absolute top-0 w-full bg-white rounded-b-2xl shadow-md shadow-slate-300">
      <div className="px-3 py-3 flex gap-2">
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
          <Controller
            name="searchKeyword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <label className="h-10 rounded-2xl bg-gray-100 px-2 flex items-center gap-2">
                <input
                  {...field}
                  type="text"
                  className="grow outline-none bg-inherit pl-2"
                  placeholder="검색어를 입력하세요"
                />
                <button type="submit" className="text-gray-400">
                  <HiMagnifyingGlass size={20} style={{ strokeWidth: 1.5 }} />
                </button>
                {isPoiSearched && (
                  <button type="button" onClick={handleSearchReset} className="text-gray-400">
                    <HiOutlineXCircle size={25} style={{ strokeWidth: 2 }} />
                  </button>
                )}
              </label>
            )}
          />
        </form>
        <button
          onClick={toggleFilter}
          className={`list-none flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-700 linear ${
            isFilterOpen ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
          }`}>
          <HiMiniAdjustmentsHorizontal size={23} />
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 linear ${isFilterOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <MapFilter setQueryParams={setQueryParams} setIsFilterOpen={setIsFilterOpen} />
      </div>
    </div>
  );
}
