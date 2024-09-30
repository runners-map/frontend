export default function MapPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 position: relative">
      <div className="text-3xl mb-5">Runner&apos;s Map</div>
      <div className="text-2xl">로그인</div>
      <button className="btn btn-primary my-6">Google로 로그인</button>
      <button className="btn btn-primary">Kakao로 로그인</button>
      <div className="text-sm position: absolute right-0 bottom-0">E와I들</div>
    </div>
  );
}
