export default function MapPostList({
  postData,
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
      <ul className="w-full divide-y divide-gray-300">
        {postData?.map((item, index) => (
          <li key={item.postId}>
            <div
              onClick={() => handleClickList(item.lat, item.lng)}
              className="flex items-center p-2"
            >
              <img
                src={createMarkerIcon(index + 1, "post")} // 마커 이미지를 리스트 항목에 표시
                alt={`marker-${index + 1}`}
                className="w-8 h-8 mr-2"
              />
              <span>{item.title}</span>
              <span>{item.gender}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
