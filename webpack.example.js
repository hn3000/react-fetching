
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './examples/main.tsx',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-fetching example',
      filename: 'index.html',
      template: 'examples/index.html'
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    })
  ],
  resolve: {

    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'run'),
    filename: 'example-bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

}