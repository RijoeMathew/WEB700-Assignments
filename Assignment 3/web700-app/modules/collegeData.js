//create data class with two properties students and courses
class Data{
    constructor(students,courses){
        this.students=students;
        this.courses=courses;
    }
}


var dataCollection=null; //initialise variable that holds an object of Data class later
var fs = require('fs'); //import the fs module

//initialise function to read the students.json and courses.js using promise
module.exports.initialize = function(){
return new Promise(function(resolve, reject){        
    
    var studentDataFromFile = null; //initialise studentDataFromFile variable as null
    var courseDataFromFile = null; //initialise courseDataFromFile variable as null
    
    //creating studentPromise object to read students.json file
    const studentPromise = new Promise(function(resolve,reject){    
        fs.readFile('./data/students.json', 'utf8', function(err, data){
            
            if (err){
                reject("unable to read students.json"); //reject the promise since there was an error while reading the students.json file
                return; // exit the function
            }
            
            studentDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects 
            resolve('Read students.json file'); //resolve the promise since reading students.json is completed
            
        });   

    });

    //creating studentPromise object to read courses.json file
    const coursePromise = new Promise(function(resolve,reject){
        fs.readFile('./data/courses.json', 'utf8', function(err, data){
            
            if (err){     
                reject("unable to read courses.json");//reject the promise since there was an error while reading the courses.json file
                
                return; // exit the function
            }
             
            courseDataFromFile = JSON.parse(data); // convert the JSON from the file into an array of objects  
            resolve('Read courses.json file');  //resolve the promise since reading courses.json is completed     
        });

    });    
       
    studentPromise.then(success => {
        coursePromise.then(success => 
        {
            dataCollection = new Data(studentDataFromFile, courseDataFromFile);            
            resolve('initialize() successfully completed');
        }).catch(error => {reject(error)})
    }).catch(error => {reject(error)});
    
});

};



//creating Promise object for getallstudents function to get all the student objects
module.exports.getAllStudents = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.students.length != 0){ //checks if student objects array is empty or not
        resolve(dataCollection.students); //resolve the promise since student objects array is not empty
    }
    else{
        reject("no results returned"); //reject the promise since student objects array is empty
    }    
});
};



//creating Promise object for getTas function to get all the student objects of students who are TAs
module.exports.getTAs = function(){
return new Promise(function(resolve, reject){
    var studentsTAs= []; //initialise studentsTA array

    for(i=0;i<dataCollection.students.length;i++) //iterates over 0 till the last index of dataCollection.students array
    {       
        if (dataCollection.students[i].TA){ //checks if the TA property of the particular student object is true or not
            studentsTAs.push(dataCollection.students[i]); //add the student object to the studentTsA array
        }
    }

    if (studentsTAs.length != 0){ //checks if studentTA array is empty or not
        resolve(studentsTAs);   //resolve the promise since the studentsTA array is not empty   
    }
    else{
        reject("no results returned"); //reject the promise since the studentsTA array is empty 
    }      
});
};



//creating Promise object for getCourses function to get all the course objects
module.exports.getCourses = function(){
return new Promise(function(resolve, reject){
    if (dataCollection.courses.length != 0){ //checks if courses objects array is empty or not
        resolve(dataCollection.courses);  //resolve the promise since courses objects array is not empty
    }
    else{
        reject("no results returned"); //reject the promise since courses objects array is empty
    }    
})
};



//creating Promise object for getStudentsByCourse function to get all the student objects whose course property matches the course parameter 
module.exports.getStudentsByCourse = function(course){
    return new Promise(function(resolve, reject){

        var studentsCourses= []; //initialise studentsCourses array

        for(i=0;i<dataCollection.students.length;i++) //iterates over 0 till the last index of dataCollection.students array
        {       
            if (dataCollection.students[i].course == course){ //checks if the TA property of the particular student object is true or not
                studentsCourses.push(dataCollection.students[i]); //add the student object to the studentTsA array
            }
        }

        if (studentsCourses.length != 0){ //checks if student objects array is empty or not
            resolve(studentsCourses);  //resolve the promise since student objects array is not empty
        }
        else{
            reject("no results returned"); //reject the promise since student objects array is empty
        }    
    })
    };



//creating Promise object for getStudentByNum function to get the student object whose num property matches the studentNum parameter 
module.exports.getStudentByNum = function(num){
    return new Promise(function(resolve, reject){
        
        var studentObj = {};
        
        for(i=0;i<dataCollection.students.length;i++) //iterates over 0 till the last index of dataCollection.students array
        {       
            if (dataCollection.students[i].studentNum == num){ //checks if the studentNum property of the particular student object is matches with num
                studentObj = dataCollection.students[i]; //add the student object to the studentTsA array
            }
        }

        if (studentObj != null){ //checks if student object is available
            resolve(studentObj);  //resolve the promise since student object is available
        }
        else{
            reject("no results returned"); //reject the promise since student is not available
        }    
    })
    };    

