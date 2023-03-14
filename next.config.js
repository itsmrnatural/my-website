module.exports = {
    images: {
        domains: [
            'i.imgur.com',
            'localhost',
            '/',
            'cdn.discordapp.com',
            'avatars.githubusercontent.com',
        ],
    },
    mode: 'production',
    optimization: {
        minimizer: [
            (compiler) => {
                const TerserPlugin = require('terser-webpack-plugin')
                new TerserPlugin({}).apply(compiler)
            },
        ],
    },
}
