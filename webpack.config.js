var debug = process.env.NODE_ENV !== 'production'
// var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-mobx-admin.js',
    library: 'react-mobx-admin',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: [
    'axios',
    'mobx',
    'react',
    'lodash',
    'deep-equal'
  ]
  // plugins: debug ? [] : [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  // ]
}

// TODO: https://webpack.js.org/guides/production
