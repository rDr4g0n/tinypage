#!/usr/bin/env node

const { makeTinyPage } = require("./make-tiny-page");

const path = require("path");
const fs = require("fs");
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

makeTinyPage(template, entry, outfile)
  .then(stats => {
    // move built html file to destination
    fs.copyFileSync("./dist/index.html", outfile);
    // TODO - log bundle size, outfile path
  })
  .catch(err => {
    console.log(err);
    console.log("\nFailed to generate tiny page");
    process.exit(1);
  });
