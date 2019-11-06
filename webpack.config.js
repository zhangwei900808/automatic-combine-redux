const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = dir => path.join(__dirname, ".", dir);
const isProd = process.env.NODE_ENV === "production";
const { version, name, description } = require("./package.json");
const distDir = path.join(process.cwd(), "dist");

module.exports = {
  mode: "production",
  entry: { [name]: "./src/index.js" },
  output: {
    // path: resolve("dist"), // 输出目录
    path: distDir,
    filename: "[name].min.js",
    umdNamedDefine: true, // 是否将模块名称作为 AMD 输出的命名空间
    //不加下面几行，被引用会被报错
    libraryTarget: "umd", // 采用通用模块定义
    library: name
  },
  devtool: "#source-map",
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    enforceExtension: false,
    extensions: [".js", ".jsx", ".json"]
  },
  // 注意：本地预览的时候要注释，否则报 require undefined
  // https://stackoverflow.com/questions/45818937/webpack-uncaught-referenceerror-require-is-not-defined
  externals: [nodeExternals()],
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [distDir]
    })
  ],
  //压缩js
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  node: {
    setImmediate: false,
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
