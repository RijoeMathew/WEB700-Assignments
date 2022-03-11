/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Rijoe Chacko Mathew Student ID: 132469214 Date: 11-MAR-22
*
*  Online (Heroku) Link: https://aqueous-springs-78471.herokuapp.com/
*
********************************************************************************/

var collegeData = require("./modules/collegeData.js"); //Importing the collegeData Module
var path = require("path"); //Importing the path Module

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the url path /students and additionaly to /students?course=value
app.get("/students", (req, res) => {
    
    if (Object.keys(req.query).length == 0){    //checks if the req.query object is empty 
    collegeData.getAllStudents().then(success => {res.send(JSON.stringify(success))})  //use the getAllStudents to get all student objects and sends the json formatted string if successfull
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})  //when the method invokes reject, send the mentioned object back as json
    }

    //use the getStudentsByCourse to get all student objects with course parameter having value as req.query.course and sends the json formatted string if successfull
    else{  
    collegeData.getStudentsByCourse(req.query.course).then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})    //when the method invokes reject, send the mentioned object back as json
    }  
    });


// setup a 'route' to listen on the url path /tas and sends the json formatted string of all students who are TAs
app.get("/tas", (req, res) => {        
    collegeData.getTAs().then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });


// setup a 'route' to listen on the url path /courses and sends the json formatted string of all courses
app.get("/courses", (req, res) => {        
    collegeData.getCourses().then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });


// setup a 'route' to listen on the url path /student/:num and sends the json object of the student whose studentNum parameter holds the value same as num
app.get("/student/:num", (req, res) => {     
    collegeData.getStudentByNum(req.params.num).then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });

 
// setup a 'route' to listen on the default url path 
app.get("/", (req, res) => {     
    res.sendFile(path.join(__dirname +'/views/home.html'))
    });


// setup a 'route' to listen on the url path /about
app.get("/about", (req, res) => {     
    res.sendFile(path.join(__dirname +'/views/about.html'))
    });


// setup a 'route' to listen on the url path /htmlDemo
app.get("/htmlDemo", (req, res) => {     
    res.sendFile(path.join(__dirname +'/views/htmlDemo.html'))
    });


app.get("/students/add", (req, res) => {     
    res.sendFile(path.join(__dirname +'/views/addStudent.html'))
    });


app.get("/public/css/theme.css", (req, res) => {     
    res.sendFile(path.join(__dirname +'/public/css/theme.css'))
    });


//added body parser
app.use(express.urlencoded({ extended: true }));

app.post('/students/add', function (req, res) {
    collegeData.addStudent(req.body).then(()=>{res.redirect('/students')})
    .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    })
        

// used to add middleware to return page not found message when the user enters a route that is not matched with anything in the app 
app.use((req, res) => {
    res.status(404).send("Page Not Found");
    });

// used to identify "public" folder as a source for static files
app.use(express.static(path.join(__dirname +'/public')));



// checks if initialize method is successfull then setup http server to listen on HTTP_PORT, if initalize method invoked reject error is displayed on console
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
})
    .catch(error => {console.log(error)});