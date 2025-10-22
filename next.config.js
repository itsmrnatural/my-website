const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-gfm"), require("remark-footnotes")],
    rehypePlugins: [
      require("rehype-slug"),
      require("rehype-autolink-headings"),
      require("rehype-highlight"),
    ],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    domains: ["i.imgur.com", "localhost", "cdn.discordapp.com", "avatars.githubusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    config.mode = "production";

    if (!isServer) {
      const TerserPlugin = require("terser-webpack-plugin");
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
