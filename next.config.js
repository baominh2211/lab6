/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Compiler (experimental - React 19)
  // experimental: {
  //   reactCompiler: true,
  // },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
