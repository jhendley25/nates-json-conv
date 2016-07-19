"use-strict";
var fs = require('fs');
var es = require('event-stream');
var jsonCsv = require('json-csv');
var chalk = require('chalk');
var fields = require('./fields')
var out = fs.createWriteStream("facilities.csv", {encoding: 'utf8'})
var data = fs.readFileSync("facilities.json", "utf8")
var jsonContent = JSON.parse(data)
var readable = es.readArray(jsonContent.facilities)
var options = {
  fields: fields
}

console.log(chalk.green("Converting all the things!"))

readable
  .pipe(jsonCsv.csv(options))
  .pipe(out)
