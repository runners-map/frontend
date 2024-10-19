/* eslint-disable @next/next/no-sync-scripts */

import MapModal from "@/components/MapModal";
import MapRoute from "@/components/MapRoute";

export const metadata = {
  title: "Runner's Map",
};

export default function MapPage() {
  return (
    <>
      <script
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`}
      ></script>
      <MapRoute />
      <MapModal />
    </>
  );
}
