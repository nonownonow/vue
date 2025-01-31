// const path = require('path')
const webpack = require('webpack')
const ora = require('ora')
const chalk = require('chalk')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
  if (stats.hasErrors()) {
    console.log(chalk.red(' Build failed with errors.\n'))
    process.exit(1)
  }
  console.log(chalk.cyan(` ${process.env.NODE_ENV} Build complete!!\n`))
})
