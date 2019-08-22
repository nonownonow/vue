const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd } = require('./utils')

let htmlTemplate
switch (process.env.BUILD_TYPE) {
  case 'player':
    htmlTemplate = './page/got-player.html'
    break
  case 'setting':
    htmlTemplate = './page/setting.html'
    break
  case 'popattend':
    htmlTemplate = './popup/pop-attend.html'
    break
  default:
    htmlTemplate = './index.html'
}

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
        template: htmlTemplate
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
