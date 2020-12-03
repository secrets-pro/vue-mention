module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      lodash: "_",
      "@secrets/vue-menu": "vue-menu"
    },
    optimization: {
      minimize: true
    }
  }
};
