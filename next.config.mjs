/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "i.namu.wiki",
      "runnersmap-bucket.s3.ap-northeast-2.amazonaws.com",
      "img.freepik.com",
      "mydaily.co.kr",
      "dispatch.cdnser.be",
    ], // 외부 이미지 도메인 추가
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프록시하려는 경로 (API 요청 경로)
        // destination: "http://43.202.152.217:8080/api/:path*", // 백엔드 서버의 실제 주소
        destination: "http://localhost:3001/:path*", // json-server 주소로 변경
      },
    ];
  },
};

export default nextConfig;
