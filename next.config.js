module.exports = {
    images: {
        domains: [
            "i.imgur.com",
            "localhost",
            "cdn.discordapp.com",
            "avatars.githubusercontent.com",
        ],
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
    swcMinify: true,
    reactStrictMode: true,
    poweredByHeader: false,
};
