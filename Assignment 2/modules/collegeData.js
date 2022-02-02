class Data{
    constructor(students,courses){
        this.students=students;
        this.courses=courses;
    }
}

var dataCollection=null;

module.exports.initialize = function(){
return new Promise(function(resolve, reject){    
    const fs = require('fs');
    console.log('#1');
    var studentDataFromFile = null;
    var courseDataFromFile = null;
    console.log('#2');
    fs.readFile('./data/students.json', 'utf8', function(err, data){
        console.log('#3');
        if (err){
            console.log('#4');
            reject("unable to read students.json")
            return; // exit the function
        }
        console.log('#5');
        studentDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects 
    });
    console.log('#6');
    fs.readFile('./data/courses.json', 'utf8', function(err, data){
        console.log('#7');
        if (err){
            console.log('#8');
            reject("unable to read courses.json")
            return; // exit the function
        }
        console.log('#9');
        courseDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects  
               
    });
    console.log('#10');
    dataCollection = new Data(studentDataFromFile, courseDataFromFile);
    console.log('#11');
    
    resolve("initialize() complete"); 
    
    console.log('#12'); 
})

};


module.exports.getAllStudents = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.students.length != 0){
        resolve(dataCollection.students);
    }
    else{
        reject("no results returned");
    }    
})
};


module.exports.getTAs = function(){
return new Promise(function(resolve, reject){
    var studentsTAs={};
    for(i=0;i<dataCollection.students.length;i++) //iterates over 0 till the last index of dataCollection.students array
    {
        if (dataCollection.students[i].TA){
            studentsTAs+=dataCollection.students[i];
        }
    }

    if (studentsTAs.length == 0){
        reject("no results returned");
    }
    else{
        resolve(studentsTAs);
    }      
})
};



module.exports.getCourses = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.courses.length == 0){
        resolve(dataCollection.courses);
    }
    else{
        reject("no results returned");
    }    
})
};