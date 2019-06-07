module.exports = {
  outputDir:'docs',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        "vue$": 'vue/dist/vue.esm.js'
      }
    }
  }
}