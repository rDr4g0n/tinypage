#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const webpack = require("webpack");
const commandLineArgs = require('command-line-args')

const optionDefs = [
  { name: "template", type: String, description: "path to html template" },
  { name: "entry", type: String, description: "path to js entry file" },
  { name: "outfile", type: String, description: "path to write output html file" },
];
// TODO - help output
const options = commandLineArgs(optionDefs);

// TODO - validate paths
const cwd = process.cwd();
const template = path.resolve(cwd, options.template);
const entry = path.resolve(cwd, options.entry);
const outfile = path.resolve(cwd, options.outfile);

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

webpack(getConfig(template, entry), (err, stats) => {
  if(err){
    console.log("Webpack encountered an error", err);
    process.exit(1);
  }
  if(stats.hasErrors()){
    console.log(stats.errors);
    console.log("An error occurred during build");
    process.exit(1);
  }
  // TODO - log filesize

  // move built html file to destination
  fs.copyFileSync("./dist/index.html", outfile);
});
