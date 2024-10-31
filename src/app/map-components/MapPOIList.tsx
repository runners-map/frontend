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
      <ul className="w-full space-y-3 m-4">
        {poiSearchData?.map((item, index) => (
          <li key={item.name}>
            <div
              onClick={() => handleClickList(item.noorLat, item.noorLon)}
              className="flex items-center p-2 rounded-2xl bg-gray-50 shadow"
            >
              <img
                src={createMarkerIcon(index + 1, "poi")}
                alt={`marker-${index + 1}`}
                className="w-8 h-8 mr-2"
              />
              <div>
                <div>{item.name}</div>
                <div className="text-sm">
                  {item.newAddressList.newAddress[0].fullAddressRoad}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
