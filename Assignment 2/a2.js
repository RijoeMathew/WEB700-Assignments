/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Rijoe Chacko Mathew Student ID: 132469214 Date: 02/05/2022
*
********************************************************************************/

var collegeData = require("./modules/collegeData.js"); //Importing the collegeData Module

//if initialize function is resolved, we are checking for other functions and if any of the promises are rejected same is being handled
collegeData.initialize().then(() => {
    collegeData.getAllStudents().then(success => {console.log(`Successfully retrieved ${success.length} students`)}).catch(error => {console.log('FAILED: ' + error)});
    collegeData.getCourses().then(success => {console.log(`Successfully retrieved ${success.length} courses`)}).catch(error => {console.log('FAILED: ' + error)});
    collegeData.getTAs().then(success => {console.log(`Successfully retrieved ${success.length} TAs`)}).catch(error => {console.log('FAILED: ' + error)});
}).catch(error => {console.log('FAILED: ' + error)}); 