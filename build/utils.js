const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getAbsolutePathFromCwd = (dirname = '.') => path.resolve(process.cwd(), dirname)

function assetsPath (dir) {
  // console.log(path.posix.join(process.env.ASSETS_SUB_DIRECTORY, dir))
  return path.posix.join('static', dir)
}

function cssLoaders (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'style-loader'
      // })
      return [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            hmr: process.env.NODE_ENV === 'development'
          }
        }
      ].concat(loaders)
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    scss: generateLoaders('sass')
  }
}

function styleLoaders (options) {
  const output = []
  const loaders = cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

module.exports = {
  assetsPath,
  cssLoaders,
  styleLoaders,
  getAbsolutePathFromCwd
}
