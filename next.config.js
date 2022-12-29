/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'api-nft.attoaioz.cyou',
      'aioz.art',
      '68.183.178.134',
      '1.bp.blogspot.com',
      'picsum.photos',
      'ipfs.io',
      'd33wubrfki0l68.cloudfront.net',
      'cloudfront-us-east-1',
      'cloudfront-us-east-1.images.arcpublishing.com',
    ],
  },
  output: 'standalone',
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    return config
  },
}

module.exports = nextConfig
