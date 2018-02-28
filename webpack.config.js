const path = require('path')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cssFilename = 'static/css/[name].[contenthash:8].css'
const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') }

const plugins = [
  new CleanWebpackPlugin(['build/js'], {
    verbose: true
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public/index.html'),
    inject: 'body',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new ExtractTextPlugin({
    filename: cssFilename
  }),
  new CopyWebpackPlugin([{ from: 'public/assets', to: 'static/assets' }])
]

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'public')
  },
  entry: ['babel-polyfill', './src/client'],
  output: {
    libraryTarget: 'umd',
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'stage-3', 'env']
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({flexbox: 'no-2009'})
                    ]
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
      }
    ]
  },
  plugins: plugins
}
