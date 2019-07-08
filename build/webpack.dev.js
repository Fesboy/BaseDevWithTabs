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
    overlay: {
      errors: true
    },
    before: function(app) {
      if (process.env.MOCK === "true") {
        mockProxy(app);
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
