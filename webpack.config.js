var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/client/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname
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
        new HtmlWebpackPlugin({
            template: 'src/client/index.tmpl.html',
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/', to: 'assets/' },
        ])
    ],
};