const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const webpack = require("webpack");

// TODO - this comes from user
const template = "/Users/jmatos/src/csp.composite.ui/src/resend-confirmation/index.ejs";
const entry = "/Users/jmatos/src/csp.composite.ui/src/resend-confirmation/index.js";
const outfile = "/Users/jmatos/src/csp.composite.ui/dist/resend-confirmation.html";

const config = {
  mode: "production",
  entry: {
    main: entry,
  },
  resolve: {
    alias: {
      // babel will polyfill corejs as needed, and that needs to resolve
      // to this util's local corejs install
      "core-js": path.resolve(__dirname, "node_modules/core-js")
    }
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
};

webpack(config, (err, stats) => {
  if(err){
    console.log("Webpack encountered an error", err);
    process.exit(1);
  }
  if(stats.hasErrors()){
    console.log(stats);
    console.log("An error occurred during build");
    process.exit(1);
  }
  // TODO - log filesize
  // console.log(stats);

  // move built html file to destination
  fs.copyFileSync("./dist/index.html", outfile);
});
