var collegeData = require("./modules/collegeData.js"); //Importing the collegeData Module
var path = require("path"); //Importing the path Module

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();


app.get("/students", (req, res) => {

    if (Object.keys(req.query).length == 0){    
    collegeData.getAllStudents().then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})  
    }

    else{  
    collegeData.getStudentsByCourse(req.query.course).then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})     
    }  
    });


app.get("/tas", (req, res) => {        
    collegeData.getTAs().then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });


app.get("/courses", (req, res) => {        
    collegeData.getCourses().then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });


app.get("/student/:num", (req, res) => {     
    collegeData.getStudentByNum(req.params.num).then(success => {res.send(JSON.stringify(success))})
        .catch(() => {res.send(JSON.stringify({message:"no results"}) )})
    });


// setup a 'route' to listen on the default url path    
app.get("/", (req, res) => {     
    res.sendFile(__dirname +'/views/home.html')
    });

 
app.get("/about", (req, res) => {     
    res.sendFile(__dirname +'/views/about.html')
    });


app.get("/htmlDemo", (req, res) => {     
    res.sendFile(__dirname +'/views/htmlDemo.html')
    });


app.use((req, res) => {
    res.status(404).send("Page Not Found");
    });


// setup http server to listen on HTTP_PORT
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
})
    .catch(error => {console.log(error)});