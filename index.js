#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const commandLineArgs = require('command-line-args')
const prettyBytes = require('pretty-bytes');
const { makeTinyPage } = require("./make-tiny-page");

const optionDefs = [
  { name: "template", type: String, description: "path to html template - default './index.ejs'" },
  { name: "entry", type: String, description: "path to js entry file - default './index.js'" },
  { name: "outfile", type: String, description: "path to write output html file - default './index.html'" },
  { name: "dir", type: String, defaultOption: true, description: "directory to files - default is current working dir" }
];
// TODO - help output
const options = commandLineArgs(optionDefs);

// TODO - validate paths
const cwd = path.resolve(options.dir || process.cwd());
const template = path.resolve(cwd, options.template ||  "index.ejs");
const entry = path.resolve(cwd, options.entry || "index.js");
const outfile = path.resolve(cwd, options.outfile || "index.html");

makeTinyPage(template, entry, outfile)
  .then(stats => {
    // TODO - verify this is local dist and not somewhere else :/
    // move built html file to destination
    fs.copyFileSync("./dist/index.html", outfile);
    const { size } = fs.statSync(outfile);
    console.log(`Created a ${prettyBytes(size)} tinypage at ${outfile}`);
  })
  .catch(err => {
    console.log(err);
    console.log("\nFailed to generate tiny page");
    process.exit(1);
  });
