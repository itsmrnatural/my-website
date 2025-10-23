import mdx from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import TerserPlugin from "terser-webpack-plugin";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFootnotes],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeHighlight,
    ],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["i.imgur.com", "localhost", "cdn.discordapp.com", "avatars.githubusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    config.mode = "production";

    if (!isServer) {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        })
      );
    }

    return config;
  },
  reactStrictMode: true,
  poweredByHeader: false,
});
