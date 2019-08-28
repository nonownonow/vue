const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd } = require('./utils')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  module: {
    rules: styleLoaders({ sourceMap: true, usePostCSS: true })
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    // contentBase: getAbsolutePathFromCwd('dist')
    compress: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './index.html'
      }
    ),
    new CopyWebpackPlugin([
      {
        from: getAbsolutePathFromCwd(process.env.ASSETS_STATIC_DIRECTORY),
        to: process.env.ASSETS_SUB_DIRECTORY,
        ignore: ['.*']
      }
    ])
  ]
})
