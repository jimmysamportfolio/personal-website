import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/writing", destination: "/#writing", permanent: false },
      { source: "/project", destination: "/#side", permanent: false },
      { source: "/project/RAG-pipeline", destination: "/project/advizr", permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
