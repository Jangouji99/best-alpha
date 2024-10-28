/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  swcMinify: true,
  // experimental: {
  //   // Required:
  //   appDir: true,
  // },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['192.168.0.34'], // Add your domain here
  }

};
