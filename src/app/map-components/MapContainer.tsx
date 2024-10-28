"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MapSearchPOI from "@/app/map-components/MapSearchPOI";
import MapCurrentLocation from "@/app/map-components/MapCurrentLocation";
import MapPostList from "@/app/map-components/MapPostList";
import MapPOIList from "@/app/map-components/MapPOIList";
import MapPostDetails from "@/app/map-components/MapPostDetails";
import { HiMiniChevronUp, HiMiniChevronDown } from "react-icons/hi2";
import { LuPencilLine } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MapPostQuery } from "@/types/Post";
import { useUserInfo } from "@/types/UserInfo";

export default function MapContainer() {
  const [queryParams, setQueryParams] = useState<MapPostQuery>({
    centerLat: "",
    centerLng: "",
    gender: "",
    paceMinStart: "",
    paceMinEnd: "",
    distanceStart: "",
    distanceEnd: "",
    limitMemberCntStart: "",
    limitMemberCntEnd: "",
    startDate: "",
    startTime: "",
  });

  const [map, setMap] = useState<Tmapv2.Map | null>(null);
  const [isListVisible, setIsListVisible] = useState(true);

  const [poiSearchData, setPoiSearchData] = useState(null);
  const [poiMarkerArr, setPoiMarkerArr] = useState<Tmapv2.Marker[] | null>([]);
  const [isPoiSearched, setIsPoiSearched] = useState(false);

  const [postData, setPostData] = useState([]);
  const [postMarkerArr, setPostMarkerArr] = useState<Tmapv2.Marker[] | null>(
    []
  );

  const [selectedPost, setSelectedPost] = useState(null);

  const { user } = useUserInfo();

  useEffect(() => {
    // const [lat, lng] = user?.lastPosition
    //   .replace(/[()]/g, "")
    //   .split(",")
    //   .map((coord) => parseFloat(coord.trim()));

    if (window.Tmapv2) {
      const newMap = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(33.450936, 126.569477),
        width: "100%",
        height: "100vh",
        zoom: 15,
        httpsMode: true,
      });

      newMap.addListener("dragstart", function () {});

      newMap.addListener("dragend", function () {
        const center = newMap.getCenter();
        const centerLat = center.lat();
        const centerLng = center.lng();

        // 중심 좌표를 숫자형으로 저장
        setQueryParams((prevParams) => ({
          ...prevParams,
          centerLat: parseFloat(centerLat),
          centerLng: parseFloat(centerLng),
        }));
      });

      setMap(newMap);
    }
    searchPosts();
  }, []);

  const searchPosts = async () => {
    // 마커 삭제
    if (postMarkerArr !== null) {
      postMarkerArr.forEach((marker) => marker.setMap(null));
      setPostMarkerArr([]);
    }

    try {
      const res = await axios.get("/api/posts/map-posts", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        params: queryParams,
      });
      const posts = res.data;
      setPostData(posts);

      console.log("게시글 목록", posts);

      if (posts.length > 0) {
        posts.forEach((post, index) => {
          const markerPosition = new Tmapv2.LatLng(
            post.centerLat,
            post.centerLng
          );

          const marker = new Tmapv2.Marker({
            position: markerPosition,
            icon: createMarkerIcon(
              index + 1,
              post.arriveYn ? "review" : "post"
            ),
            iconSize: new Tmapv2.Size(40, 40),
            title: post.title,
            map: map,
          });

          marker.addListener("touchstart", function () {
            setSelectedPost(post);
            setIsListVisible(true);
            const targetElement = document.getElementById("item3");
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          });

          setPostMarkerArr((prevArr) => [...prevArr, marker]);
        });
      }
    } catch (error) {
      console.error("데이터 가져오기 실패", error);
    }
  };

  const toggleVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const createMarkerIcon = (index, type) => {
    let color;
    switch (type) {
      case "post":
        color = "rgb(74, 0, 255)"; // Post 상태일 때 색상
        break;
      case "poi":
        color = "rgb(0, 215, 192)"; // POI 상태일 때 색상
        break;
      case "review":
        color = "rgb(255 0 211)"; // Review 상태일 때 색상
        break;
      default:
        color = "rgb(0, 0, 0)";
    }
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <g>
        <path d="M256,0c-85.7,0-155.2,68.2-155.2,152.2C100.8,236.3,256,512,256,512s155.2-275.7,155.2-359.8C411.2,68.2,341.7,0,256,0z" fill="${color}"/>
      </g>
      <text x="256" y="200" font-size="180" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold" dy=".3em">${index}</text>
    </svg>
  `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    searchPosts();
  }, [queryParams]);

  useEffect(() => {
    if (isPoiSearched) {
      const targetElement = document.getElementById("item1");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isPoiSearched]);

  const router = useRouter(); // useRouter 훅 사용

  const handleClick = () => {
    router.push("/post-list/post/create/searchRoute"); // 원하는 경로로 이동
  };

  return (
    <>
      <div id="map_div"></div>
      <MapSearchPOI
        setQueryParams={setQueryParams}
        map={map}
        poiMarkerArr={poiMarkerArr}
        setPoiMarkerArr={setPoiMarkerArr}
        setPoiSearchData={setPoiSearchData}
        isPoiSearched={isPoiSearched}
        setIsPoiSearched={setIsPoiSearched}
        createMarkerIcon={createMarkerIcon}
        setIsListVisible={setIsListVisible}
      />

      <div className="flex-col absolute w-full flex justify-center bottom-12 transition-transform duration-300">
        <div className="flex w-full justify-between items-center px-3">
          <MapCurrentLocation setQueryParams={setQueryParams} map={map} />
          <button
            className="btn bg-white text-primary border-0 h-10 rounded-full shadow-md shadow-slate-300"
            onClick={toggleVisibility}
          >
            {isListVisible ? (
              <>
                <HiMiniChevronDown size={20} style={{ strokeWidth: 1.5 }} />
                목록 숨기기
              </>
            ) : (
              <>
                <HiMiniChevronUp size={20} style={{ strokeWidth: 1.5 }} />
                목록 보기
              </>
            )}
          </button>
          <button
            onClick={handleClick}
            className="flex justify-center items-center bg-white text-primary h-10 w-10 rounded-full shadow-md shadow-slate-300"
          >
            <LuPencilLine size={23} style={{ strokeWidth: 2.5 }} />
          </button>
        </div>

        <div
          className={`carousel carousel-center w-full h-72 space-x-1 px-4 pb-6 pt-2 overflow-hidden transition-all duration-700 linear ${
            isListVisible ? "max-h-72" : "max-h-0"
          }`}
        >
          {isPoiSearched && (
            <div
              id="item1"
              className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500"
            >
              <MapPOIList
                poiSearchData={poiSearchData}
                setQueryParams={setQueryParams}
                map={map}
                createMarkerIcon={createMarkerIcon}
              />
            </div>
          )}
          <div
            id="item2"
            className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500"
          >
            <MapPostList
              postData={postData}
              setQueryParams={setQueryParams}
              map={map}
              createMarkerIcon={createMarkerIcon}
              setSelectedPost={setSelectedPost}
            />
          </div>
          {selectedPost && (
            <div
              id="item3"
              className="carousel-item w-full bg-white rounded-xl overflow-y-auto shadow-md shadow-slate-500"
            >
              <MapPostDetails post={selectedPost} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
