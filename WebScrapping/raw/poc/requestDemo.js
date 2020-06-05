let request = require('request');
let fs = require('fs');
let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
console.log("Sending Request");
request(url,function(error,response,html){
    console.log("Received Response");
    if(error==null && response.statusCode==200){
        fs.writeFileSync("index.html",html);
        console.log("File Saved");
    }
    else if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        console.log(error);
        console.log(response.statusCode);
    }
});