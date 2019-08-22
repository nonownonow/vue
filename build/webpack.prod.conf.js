const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd, assetsPath } = require('./utils')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
    /*    rules: styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    }) */
  },
  devtool: '#source-map',
  output: {
    path: getAbsolutePathFromCwd('dist'),
    filename: assetsPath('js/[name].js'),
    chunkFilename: assetsPath('js/[id].js')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CopyWebpackPlugin([
      {
        from: getAbsolutePathFromCwd('public'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
    // split vendor js into its own file
  ]
})
