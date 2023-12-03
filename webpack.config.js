import LodashModuleReplacementPlugin from "lodash-webpack-plugin";
import { optimize } from "webpack";
import CompressionPlugin from "compression-webpack-plugin";

export const module = {
    rules: [
        {
            use: "babel-loader",
            test: /\.js$/,
            exclude: /node_modules/,
            options: {
                plugins: ["lodash"],
                presets: [
                    ["env", { modules: false, targets: { node: 4 } }],
                ],
            },
        },
    ],
};
export const plugins = [
    new CompressionPlugin(),
    new LodashModuleReplacementPlugin(),
    new optimize.UglifyJsPlugin(),
];
