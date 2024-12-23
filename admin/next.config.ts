import path from 'path';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: [path.resolve(__dirname, '../common')],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
};

export default nextConfig;