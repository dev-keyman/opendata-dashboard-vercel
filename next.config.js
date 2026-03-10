/** @type {import('next').NextConfig} */
const nextConfig = {
  // 실험적 기능 (필요 시 활성화)
  // experimental: {
  //   serverActions: true,
  // },

  // 이미지 허용 도메인
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      // },
    ],
  },

  // 환경변수 (공개용)
  // env: {
  //   CUSTOM_VAR: process.env.CUSTOM_VAR,
  // },
};

module.exports = nextConfig;
