"use strict";
const Path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackNodeExternals = require("webpack-node-externals");

const resolvePath = relativePath => Path.resolve(__dirname, relativePath);

module.exports = {
  mode: "production",
  target: "node",
  devtool: "source-map",
  entry: {
    index: ["./src/index.ts"]
  },
  output: {
    path: resolvePath("lib"),
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  externals: [WebpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|ts)$/u,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-transform-runtime"
          ]
        },
        exclude: /node_modules/u
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": resolvePath("src")
    }
  }
};
