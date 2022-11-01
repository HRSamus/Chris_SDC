require("dotenv").config();
const webpack = require("webpack");

const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/client/dist/")
    },
    compress: true,
    port: 3000,
  }
};
