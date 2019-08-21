'use strict'
const utils = require('./utils')
const config = require('../config')
// TODO const isProduction = process.env.NODE_ENV === 'production'

console.log(process.env.NODE_ENV)
const sourceMapEnabled = true

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: true
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
