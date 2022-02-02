/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Rijoe Chacko Mathew Student ID: 132469214 Date: 01/30/2022
*
********************************************************************************/

var collegeData = require("./modules/collegeData.js");

collegeData.initialize().then(success => {
    collegeData.getAllStudents().then(success => {console.log(`Successfully retrieved ${success} students`)}).catch(error => {console.log('FAILED: ' + error)})
}).catch(error => {console.log('FAILED: ' + error)});
