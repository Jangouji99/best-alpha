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
    domains: ['alimentaire-api.vercel.app'], // Add your domain here
  }

};
