/* eslint-disable @next/next/no-sync-scripts */
import Map from '../../../../components/Map';

export const metadata = {
  title: '경로 설정하기'
};

export default function SearchRoute() {
  return (
    <>
      <script src={process.env.TMAP_API_KEY}></script>
      <Map />
    </>
  );
}
