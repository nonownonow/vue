// const path = require('path')
require('dotenv').config()
const webpack = require('webpack')
const ora = require('ora')
const chalk = require('chalk')
// const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
process.env.NODE_ENV = 'production'
const spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }))
  if (stats.hasErrors()) {
    console.log(chalk.red(' Build failed with errors.\n'))
    process.exit(1)
  }
  console.log(chalk.cyan(' Build complete.\n'))
  console.log(process.env.NODE_ENV)
})
