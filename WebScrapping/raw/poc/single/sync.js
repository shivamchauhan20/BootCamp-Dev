let fs = require("fs");
console.log("Before");
function f1cb(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("Data of f1 arrived");
        console.log("Content is "+content);
    }
}
fs.readFile("../f1.txt",f1cb);