const port = '3000'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/styles/custom.scss";'
      }
    }
  },
  lintOnSave: false,
  devServer: {
    open: true,
    port
  }
}
