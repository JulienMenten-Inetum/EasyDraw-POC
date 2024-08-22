/* global require module */

var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    filename: "drawing-tool.js",
    path: path.resolve(__dirname, "dist"),
    library: "DrawingTool",
    libraryTarget: "umd",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader", // saves css to file
            options: {
              name: "[name].css",
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        // Support ?123 suffix, e.g. ../fonts/m4d-icons.eot?3179539#iefix
        test: /\.(eot|ttf|woff|woff2|svg)((\?|\#).*)?$/,
        loader: "url-loader?limit=8192",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  externals: [
    {
      jquery: {
        root: "jQuery",
        commonjs2: "jquery",
        commonjs: "jquery",
        amd: "jquery",
      },
    },
  ],
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};
