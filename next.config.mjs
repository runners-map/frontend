/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.namu.wiki"], // 외부 이미지 도메인 추가
  },
};

export default nextConfig;
