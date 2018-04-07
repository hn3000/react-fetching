
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

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
    })
  ],
  resolve: {
    
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'run'),
    filename: 'example-bundle.js'
  }
}