/* eslint-disable @next/next/no-sync-scripts */
import MapRoute from "@/app/post/create/searchRoute/MapRoute";

export const metadata = {
  title: "경로 설정하기",
};

export default function SearchRoute() {
  return (
    <>
      <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <script
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`}
      ></script>
      <MapRoute />
    </>
  );
}
