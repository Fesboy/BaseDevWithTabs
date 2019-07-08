const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: devMode ? "[name].js" : "[name].[contenthash:8].js",
    chunkFilename: devMode ? "[id].async.js" : "[id].[contenthash:8].async.js",
    publicPath: "/"
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        use: "babel-loader"
      },
      {
        test: /\.less$/,
        include: /src/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /.(png|jpe?g|svg|gif)$/,
        include: /src/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "img/[name].[contenthash:8].[ext]"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        include: /src/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            name: "font/[name].[contenthash:8].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../src/index.html"),
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      minify: devMode
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true
          }
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/vendors.dll.js")
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "../dll/vendors-manifest.json")
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../public"),
        to: path.resolve(__dirname, "../dist")
      }
    ])
  ],
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  performance: false
};
