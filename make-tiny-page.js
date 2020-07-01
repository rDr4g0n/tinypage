const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const webpack = require("webpack");

// applies user settings to a preconfigured webpack config
const getConfig = (template, entry) => ({
  mode: "production",
  // ensure webpack operates out of tinypage dir and not whatever
  // cwd is
  context: path.resolve(__dirname),
  entry: {
    main: entry,
  },
  resolve: {
    alias: {
      // babel will polyfill corejs as needed, and that needs to resolve
      // to this util's local corejs install
      "core-js": path.resolve(__dirname, "node_modules/core-js"),
    },
  },
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
        options: {
          cwd: path.resolve(__dirname),
          presets: [[
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
      },
			{
       test: /\.(html|ejs)$/,
       use: ['html-loader']
      },
			{
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // always inline images
              limit: true
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: "main.js"
    })
  ]
});

module.exports.makeTinyPage = function(template, entry, outfile){
  return new Promise((resolve, reject) => {
    webpack(getConfig(template, entry), (err, stats) => {
      if(err){
        reject(err);
      }
      if(stats.hasErrors()){
        reject(stats.toJson().errors);
      }
      resolve(stats);
    });
  });
}
