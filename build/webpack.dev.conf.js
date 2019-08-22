const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd, assetsPath } = require('./utils')
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
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(
      {
        template: htmlTemplate
      }
    ),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: getAbsolutePathFromCwd('public'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
/*  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*!/, to: getAbsolutePathFromCwd('index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  */
})
