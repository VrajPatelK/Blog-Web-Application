/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "cdn.pixabay.com" },
      { hostname: "firebasestorage.googleapis.com" },
    ],
  },
};

module.exports = nextConfig;
