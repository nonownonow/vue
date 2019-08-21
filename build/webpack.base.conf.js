const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
const getAbsolutePathFromCwd = (dirname = '.') => path.resolve(process.cwd(),
  dirname)

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
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
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
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  }
}
