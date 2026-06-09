// next.config.js

import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
            {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol:"https",
        hostname:'drive.google.com'
      },
      {
        protocol: "https",
        hostname: 'res.cloudinary.com'
      }
    ],
  },
};

module.exports = nextConfig;