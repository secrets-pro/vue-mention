let env = process.env.NODE_ENV == "production";
let externals = env
  ? {
      lodash: "_"
      // "@secrets/vue-menu": "vue-menu"
    }
  : undefined;
module.exports = {
  lintOnSave: false,
  productionSourceMap: true,
  configureWebpack: {
    externals,
    optimization: {
      minimize: true
    }
  }
};
