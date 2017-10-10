var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        index: './src/client/index.ts'
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build/static'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        modules : ["node_modules","./src/"],
        extensions: [".tsx", ".ts", ".js"]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "manifest.json"),
        }),
        new webpack.DefinePlugin({
            'RUN_ENV':JSON.stringify('CLIENT'),
        }),
        // new HtmlWebpackPlugin({
            // template: 'src/client/index.tmpl.html',
        // }),
        new CopyWebpackPlugin([
            { from: 'src/assets/', to: 'assets/' },
            { from: 'src/client/index.tmpl.html', to: 'index.html' },
        ]),
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        proxy: {
            "/engine.io/": {
                target: "http://localhost:3000/engine.io/",
                ws: true
            },
        }
    }
};