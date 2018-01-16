const config = require('./webpack.config.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// TODO - implement externals

config.devtool = 'cheap-source-map'

config.plugins.push(new UglifyJSPlugin({
  sourceMap: true,
  compressor: {
    warnings: false,
    comparisons: false
  },
  output: {
    comments: false,
    ascii_only: true
  }
}))

module.exports = config
