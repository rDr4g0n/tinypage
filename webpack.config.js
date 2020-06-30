const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js?$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          "presets": [[
            "@babel/preset-env",
            {
              "targets": {
                "ie": "11"
              },
              "useBuiltIns": "usage",
              "corejs": 3,
            }
          ]]
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: "main.js"
    })
  ]
};
