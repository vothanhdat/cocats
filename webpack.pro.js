const webpack = require('webpack')
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.dev.js');
const BabiliPlugin = require("babili-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

const clientConfig = Merge(CommonConfig, {
  devtool: '',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new BabiliPlugin({
      mangle: { topLevel: true },
      deadcode: false,
      removeConsole: true,
      evaluate : false,
      removeDebugger : true,
    })
  ]
})


const serverConfig = {
  entry: './src/server/index.ts',
  target: 'node',
  output: {
    filename: 'index.js',
    path: __dirname + '/build/',
    libraryTarget: 'commonjs2'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules", "./src/"],
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.targets': {
        'node': 'current',
      },
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'port': 'process.env.port',
        'PORT': 'process.env.PORT',
      }
    }),
  ],
  devtool: 'inline-source-map',
};



module.exports = [
  clientConfig,
  serverConfig
]