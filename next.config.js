export const images = {
    domains: [
        "i.imgur.com",
        "localhost",
        "/",
        "cdn.discordapp.com",
        "avatars.githubusercontent.com",
    ],
};
export const mode = "production";
export const optimization = {
    minimizer: [
        (compiler) => {
            const TerserPlugin = require("terser-webpack-plugin");
            new TerserPlugin({}).apply(compiler);
        },
    ],
};
