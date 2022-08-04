const withYaml = require('next-plugin-yaml');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withYaml(
  withBundleAnalyzer({
    images: {
      deviceSizes: [
        16, 32, 48, 64, 96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1920,
        2048, 3840,
      ],
    },
  }),
);
