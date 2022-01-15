var serverVerbs = ["GET","GET","GET","POST","GET","POST"]
var serverPaths = ["/","/about","/contact","/login","/panel","/logout"]
var serverResponses = ["Welcome to WEB700 Assignment 1","This assignment was prepared by Rijoe Chacko Mathew","Rijoe Chacko Mathew: rcmathew1@myseneca.ca","User Logged In","Main Panel","Logout Complete"]


function httpRequest(httpVerb,path){
    for(i=0;i<serverPaths.length;i++)
    {
        if (serverPaths[i] == path && serverVerbs[i] == httpVerb)
        {
            break;            
        }
    }

    if (serverPaths[i] == path && serverVerbs[i] == httpVerb)
    {
        return `200: ${serverResponses[i]}`;
    }
    else
    {
        return `404: Unable to process ${httpVerb} request for ${path}`
    }    
}

console.log(httpRequest("GET", "/")); // shows "200: Welcome to WEB700 Assignment 1"
console.log(httpRequest("GET", "/about")); // shows "200: This Assignment was prepared by Student Name"
console.log(httpRequest("PUT", "/")); // shows "404: Unable to process PUT request for /"
