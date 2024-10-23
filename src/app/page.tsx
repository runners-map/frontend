/* eslint-disable @next/next/no-sync-scripts */
import MapContainer from '@/app/map-components/MapContainer';

export const metadata = {
  title: "Runner's Map"
};

export default function MapPage() {
  return (
    <>
      <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
      <script
        src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`}></script>
      <MapContainer />
    </>
  );
}
