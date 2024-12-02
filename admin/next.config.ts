import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.[jt]sx?$/, // Match JavaScript/TypeScript files
      include: [path.resolve(__dirname, '../common')], // Include the common folder
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'], // Use Next.js Babel presets
        },
      },
    });
    return config;
  },
};

export default nextConfig;