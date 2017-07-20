var debug = process.env.NODE_ENV !== 'production'
// var webpack = require('webpack')
var path = require('path')

module.exports = {
  devtool: debug ? 'eval-source-map' : 'hidden-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-mobx-admin.js',
    library: 'ReactMobxAdmin',
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
  externals: {
    'axios': 'axios',
    'deep-equal': 'deep-equal',
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_'
    },
    'mobx': 'mobx',
    'mobx-react': 'mobx-react',
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  }
  // plugins: debug ? [] : [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  // ]
}

// TODO: https://webpack.js.org/guides/production
