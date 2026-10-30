/** @type {import('next').NextConfig} */
// Static export. NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow
// (e.g. "/videoSummarizer"); leave it empty for a custom domain or Hostinger.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
};

export default nextConfig;
