const merge = require("webpack-merge");
const webpack = require("webpack");

const base = require("./webpack.base");
const { mockProxy } = require("./mockProxy");

module.exports = merge(base, {
  devtool: "inline-source-map",
  devServer: {
    host: "127.0.0.1",
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true,
    before: function(app) {
      // 请求本地时，即路径以 **/** 开头，自动被 mockProxy 拦截
      mockProxy(app, 1000);
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
