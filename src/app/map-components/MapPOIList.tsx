export default function MapPOIList({
  poiSearchData,
  setQueryParams,
  map,
  createMarkerIcon,
}) {
  const handleClickList = (lat, lng) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      centerLat: parseFloat(lat),
      centerLng: parseFloat(lng),
    }));
    map.setCenter(new Tmapv2.LatLng(lat, lng));
    map.setZoom(15);
  };

  return (
    <>
      <ul className="w-full  divide-y divide-gray-300">
        {poiSearchData?.map((item, index) => (
          <li key={item.name}>
            <div
              onClick={() => handleClickList(item.noorLat, item.noorLon)}
              className="flex items-center w-full p-2"
            >
              <img
                src={createMarkerIcon(index + 1, "poi")} // 마커 이미지를 리스트 항목에 표시
                alt={`marker-${index + 1}`}
                className="w-8 h-8 mr-2"
              />
              <div>{item.name}</div>
              <div>{item.newAddressList.newAddress[0].fullAddressRoad}</div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
