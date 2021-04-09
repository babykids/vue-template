const path = require('path')
const { devServerPort, mockServerPort, title } = import('./src/settings')

const isPro = process.env.NODE_ENV === 'production'

const CompressionPlugin = require('compression-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  // TODO: Remember to change publicPath to fit your need
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      // change xxx-api/login => /mock-api/v1/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:${mockServerPort}/mock-api/v1`,
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      api: {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        ws: true
        // pathRewrite: {
        //   '^/dev-api': ''
        // }
      }
    }
  },
  pwa: {
    name: title
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack (config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  },
  configureWebpack: () => {
    // if (isPro) {
    return {
      plugins: [
        // new CompressionPlugin({
        //   // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
        //   filename: '[path].gz[query]',
        //   // 使用 gzip 压缩
        //   algorithm: 'gzip',
        //   // 处理与此正则相匹配的所有文件
        //   test: new RegExp(
        //     '\\.(js|css)$'
        //   ),
        //   // 只处理大于此大小的文件
        //   threshold: 10240,
        //   // 最小压缩比达到 0.8 时才会被压缩
        //   minRatio: 0.8
        // }),
        new BundleAnalyzerPlugin({ openAnalyzer: false })
      ]
    }
    // }
  }
}
