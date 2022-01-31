class Data{
    constructor(students,courses)
    {
        this.students=students;
        this.courses=courses;
    }
}

var dataCollection=null;

return new Promise(function(resolve, reject){
function initialize() {
    const fs = require('fs');
    fs.readFile('./data/students.json', 'utf8', function(err, data){
        if (err){
            reject("unable to read students.json")
            return; // exit the function
        }
        
        let studentDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects
    });

   fs.readFile('./data/courses.json', 'utf8', function(err, data){
        if (err){
            reject("unable to read courses.json")
            return; // exit the function
        }
    
        let courseDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects
    });

    dataCollection = new Data(studentDataFromFile, courseDataFromFile);
    resolve("initialize() complete");   
}

});


