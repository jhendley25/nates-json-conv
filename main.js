"use-strict";
var fs = require('fs');
var json2csv = require('json2csv');
var Promise = require('promise');
var chalk = require('chalk');
var fields = ["zip",  "photo_profile",  "facility_type_label",  "phone",  "overview",  "operations_type_label",  "state",  "email",  "operations_type_code",  "address1",  "address3",  "section_id",  "address2",  "section_name",  "course_type_label",  "address4",  "market_type_label",  "photo_facility",  "course_type_code", "facility_name",  "city",  "facility_id", "market_type_code",  "facility_type_code"]

function readJson() {
  return new Promise((resolve) =>{
    //NOTE I had to remove the meta and error objects from the facilities.json file since it was a pain to access the nested facilities
    var data = fs.readFileSync("facilities.json", "utf8")
    var jsonContent = JSON.parse(data)
    console.log("jsonContent", jsonContent.facilities);
    resolve(jsonContent.facilities)
  })
}

function convertToCsv(data) {
  // console.log("Data in convertToCsv:", data);
  return new Promise((resolve) =>{
    json2csv({ data: data, fields: fields }, function(err, csv) {
      if (err) console.log(err);
      console.log(chalk.green("csv conversion complete, writing file"));
      resolve(csv)
    })
  })
}

function writeNewFile(csv) {
  return new Promise((resolve) =>{
    fs.writeFile("facilities.csv", csv, function(err){
      if (err) throw err
      console.log(chalk.green("Facilities.csv file created"))
      resolve()
    })
  })
}

readJson()
  .then(convertToCsv)
  .then(writeNewFile)
  .catch(function(err){
    console.log(chalk.red("error"), err)
  })
  .done()
