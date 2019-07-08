const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    vendors: ["react", "react-dom", "prop-types", "history"]
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "vendors.dll.js",
    library: "[name]",
    publicPath: "/"
  },
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, "../dll/[name]-manifest.json"),
      name: "[name]"
    }),
    new MiniCssExtractPlugin({
      filename: "vendors.css"
    })
  ],
  performance: false
};
