class Data{
    constructor(students,courses){
        this.students=students;
        this.courses=courses;
    }
}

var dataCollection=null;
var fs = require('fs');

module.exports.initialize = function(){
return new Promise(function(resolve, reject){    
    
    
    var studentDataFromFile = null;
    var courseDataFromFile = null;    
    
    const studentPromise = new Promise(function(resolve,reject){    
    fs.readFile('./data/students.json', 'utf8', function(err, data){
        
        if (err){
            console.log('#4'); 
            reject("unable to read students.json")
            return; // exit the function
        }
        
        studentDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects 
        resolve('Read students.json file');
    });   

    });

    
    const coursePromise = new Promise(function(resolve,reject){
    fs.readFile('./data/courses.json', 'utf8', function(err, data){
        
        if (err){
            reject("unable to read courses.json")
            return; // exit the function
        }
        
        courseDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects  
        resolve('Read courses.json file');       
    });

    });

    studentPromise.then(success => {coursePromise.then(success => 
        {   
            dataCollection = new Data(studentDataFromFile, courseDataFromFile);
            resolve('initialize() successfully completed'); 
        }).catch(error => {console.log('FAILED: ' + error)})
    }).catch(error => {console.log('FAILED: ' + error)});
});

};


module.exports.getAllStudents = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.students.length != 0){
        resolve(dataCollection.students);
    }
    else{
        reject("no results returned");
    }    
});
};


module.exports.getTAs = function(){
return new Promise(function(resolve, reject){
    var studentsTAs= [];

    for(i=0;i<dataCollection.students.length;i++) //iterates over 0 till the last index of dataCollection.students array
    {       
        if (dataCollection.students[i].TA){
            studentsTAs.push(dataCollection.students[i]);
        }
    }

    if (studentsTAs.length != 0){
        resolve(studentsTAs);        
    }
    else{
        reject("no results returned");
    }      
});
};



module.exports.getCourses = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.courses.length != 0){
        resolve(dataCollection.courses);
    }
    else{
        reject("no results returned");
    }    
})
};