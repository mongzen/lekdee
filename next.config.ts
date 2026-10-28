import type { NextConfig } from 'next';
const config: NextConfig = {
 poweredByHeader: false,
 experimental: { cpus: 1 },
 async headers() {
  return [{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive, nosnippet, noimageindex'}]}];
 },
};
export default config;
