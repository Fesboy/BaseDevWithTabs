const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

const base = require("./webpack.base");

module.exports = merge(base, {
  devServer: {
    host: "127.0.0.1",
    port: 3000,
    hot: true,
    historyApiFallback: true,
    compress: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
