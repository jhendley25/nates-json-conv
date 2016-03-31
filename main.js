"use-strict";

var json2csv = require('json2csv');
var Promise = require('promise');
var chalk = require('chalk');
var fields = ['field1', 'field2', 'field3'];

function readJson() {
  return new Promise((resolve) =>{
    fs.readFile("facilities.json", function(err,data){
      if (err) console.log(err);
      console.log(chalk.green("File read, beginning conversion"));
      resolve(data)
    })
  })
}
function convertToCsv(data) {
  return new Promise((resolve) =>{
    json2csv({ data: data, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      console.log(chalk.green("csv conversion complete, writing file"));
      resolve(csv)
    })
  })
})

function writeNewFile(csv) {
  return new Promise((resolve) =>{
    fs.writeFile("facilities.csv", csv, function(err){
      if (err) throw err
      console.log(chalk.green("Facilities.csv file created"))
      resolve()
    })
  })
})

readJson()
  .then(convertToCsv)
  .then(writeNewFile)
  .catch(function(err){
    console.log(chalk.red("error"), err)
  })
  .done()
