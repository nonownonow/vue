const DotenvWebpackPlugin = require('dotenv-webpack')
const { assetsPath, getAbsolutePathFromCwd } = require('./utils')

module.exports = {
  context: getAbsolutePathFromCwd(),
  entry: {
    app: './src/index.js'
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': getAbsolutePathFromCwd('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [getAbsolutePathFromCwd('src'), getAbsolutePathFromCwd('node_modules/webpack-dev-server/client')]
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
    new DotenvWebpackPlugin(
      {
        path: getAbsolutePathFromCwd('env/.env')
      }
    )
  ]
}
