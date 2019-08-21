const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
const { assetsPath, getAbsolutePathFromCwd } = require('./utils')

module.exports = {
  context: getAbsolutePathFromCwd(),
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  node: {
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: getAbsolutePathFromCwd('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [getAbsolutePathFromCwd('src'), getAbsolutePathFromCwd('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'got-player-v2',
        template: './index.html'
      }
    ),
    new DotenvWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  output: {
    path: getAbsolutePathFromCwd('dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  }
}
