/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Rijoe Chacko Mathew Student ID: 132469214 Date: 15-JAN-2022
*
********************************************************************************/

var serverVerbs = ["GET","GET","GET","POST","GET","POST"]; //initializes an array of server verbs
var serverPaths = ["/","/about","/contact","/login","/panel","/logout"]; //initializes an array of server paths
var serverResponses = ["Welcome to WEB700 Assignment 1","This assignment was prepared by Rijoe Chacko Mathew","Rijoe Chacko Mathew: rcmathew1@myseneca.ca","User Logged In","Main Panel","Logout Complete"]; //initializes an array of server responses


//Generates random integers from 0 till the integer less than the max value passed as the parameter
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


//Web server simulator function
function httpRequest(httpVerb,path) {
    for(i=0;i<serverPaths.length;i++) //iterates over 0 till the last index of serverPaths array
    {
        if (serverPaths[i] == path && serverVerbs[i] == httpVerb) //checks if the server path and server verb at the ith index is same as the path and httpverb passed as function parameters
        {
            break; //breaks out of the for loop
        }
    }

    if (serverPaths[i] == path && serverVerbs[i] == httpVerb)
    {
        return `200: ${serverResponses[i]}`; //returns the server response at the ith index of the serverResponses array
    }
    else
    {
        return `404: Unable to process ${httpVerb} request for ${path}`; //returns the 404 message since there is a mismatch
    }    
}


//Tests the httpRequest function by passing random httpverbs and paths every 1 second
function automateTests() {
    var testVerbs = ["GET","POST"]; //intializes the test verbs array
    var testPaths = ["/","/about","/contact","/login","/panel","/logout","/randomPath1","/randomPath2"]; //intializes the test paths array
    
    //Gets random http verbs and paths and pass it to the httpRequest function
    function randomRequest() {
        var randVerb = testVerbs[getRandomInt(2)]; //gets the http verb at the random index generated and stores it in a variable
        var randPath = testPaths[getRandomInt(8)]; //gets the path at the random index generated and stores it in a variable
        console.log(httpRequest (randVerb,randPath)); //displays the return value of the httpRequest function for the random verb and path
    }
    setInterval(randomRequest,1000); //executes the randomRequest function over and over again every 1s
}


automateTests(); //calls the automateTests function