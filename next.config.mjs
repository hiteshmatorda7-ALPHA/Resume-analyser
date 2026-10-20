/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` creates an /out folder you can upload to any host
  // (Hostinger, cPanel, Netlify, GitHub Pages). Vercel also works with this setting.
  output: "export",
  // Keep dev output separate so production builds cannot invalidate an active dev server.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
