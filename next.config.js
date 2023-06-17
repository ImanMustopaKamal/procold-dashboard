/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard',
  //       permanent: true,
  //     },
  //   ]
  // },
  reactStrictMode: true,
  images: {
    domains: ["api-procold.immortal-universe.com"],
  },
}

module.exports = nextConfig
