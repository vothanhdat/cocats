const webpack = require('webpack');
const path = require('path');

module.exports = {
    name: "vendor",
    entry: [
        'pixi.js',
        'pixi-gl-core',
        'sockjs-client',
        'howler',
        'resource-loader',
        'buffer',
        'json3',
        'html-entities',
        'url',
        'engine.io-client',
        'engine.io-parser',
        'protobufjs',
        'events',
        'clone',
        'loglevel',
        './src/datamodel/modal.js',
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js",".jsx", ".json"],
        unsafeCache: true,
    },

    output: {
        filename: "vendor.js",
        library: "vendor_[hash]",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: "vendor_[hash]",
            path: path.resolve(__dirname, "manifest.json")
        })
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.(tsx?|(jsx?))$/, 
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            },
        ]
    }
};