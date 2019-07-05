const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssWebpackPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: devMode ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: devMode ? "[id].js" : "[id].[contenthash:8].js"
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        use: "babel-loader"
      },
      {
        test: /\.less$/,
        include: /src/,
        use: [
          devMode ? "style-loader" : MiniCssWebpackPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssWebpackPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /.(png|jpg)$/,
        include: /src/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240
          }
        }
      },
      {
        test: /\.(ttf)$/,
        include: /src/,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html")
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public"),
        to: path.resolve(__dirname, "../dist")
      }
    ]),
    new MiniCssWebpackPlugin({
      filename: "[name].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash:8].css"
    })
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  }
};
