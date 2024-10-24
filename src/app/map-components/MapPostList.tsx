export default function MapPostList({
  postData,
  setQueryParams,
  map,
  createMarkerIcon,
  setSelectedPost,
}) {
  const handleClickList = (lat, lng, post) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      centerLat: parseFloat(lat),
      centerLng: parseFloat(lng),
    }));
    map.setCenter(new Tmapv2.LatLng(lat, lng));
    map.setZoom(15);
    const targetElement = document.getElementById("item3");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedPost(post);
  };
  return (
    <>
      <ul className="w-full space-y-3 m-4">
        {postData?.map((item, index) => (
          <li key={item.postId}>
            <div
              onClick={() => handleClickList(item.lat, item.lng, item)}
              className="flex items-center p-2 rounded-2xl bg-gray-50 shadow"
            >
              <img
                src={createMarkerIcon(
                  index + 1,
                  item.arriveYn ? "review" : "post"
                )}
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
