const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd, assetsPath } = require('./utils')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',
  module: {
    rules: styleLoaders({
      sourceMap: true,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: '#source-map',
  output: {
    path: getAbsolutePathFromCwd('dist'),
    filename: assetsPath('js/[name].[hash].js'),
    chunkFilename: assetsPath('js/[id].[hash].js'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
      ignoreOrder: false
    }),
    new CopyWebpackPlugin([
      {
        from: getAbsolutePathFromCwd(process.env.ASSETS_STATIC_DIRECTORY),
        to: process.env.ASSETS_SUB_DIRECTORY,
        ignore: ['.*']
      }
    ]),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})
