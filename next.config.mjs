/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.namu.wiki'] // 외부 이미지 도메인 추가
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://43.202.152.217:8080/api/:path*' // 백엔드 서버 주소
      }
    ];
  }
};

export default nextConfig;
