const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.conf')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { styleLoaders, getAbsolutePathFromCwd, assetsPath } = require('./utils')

const loaders = styleLoaders({ sourceMap: true, usePostCSS: true })

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  module: {
    // rules: styleLoaders({ sourceMap: true, usePostCSS: true }
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(
      {
        title: 'got-player-v2',
        template: './index.html'
      }
    ),
    new CopyWebpackPlugin([
      {
        from: getAbsolutePathFromCwd('/public'),
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
