const merge = require("webpack-merge");
const webpack = require("webpack");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const base = require("./webpack.base");

module.exports = merge(base, {
  // devtool: "source-map",
  plugins: [
    new MiniCssWebpackPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].async.css"
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin({
        sourceMap: true
      })
    ]
  }
});
