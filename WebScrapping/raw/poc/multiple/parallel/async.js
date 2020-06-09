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
function f2cb(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("Data of f2 arrived");
        console.log("Content is "+content);
    }
}
function f3cb(err,content){
    if(err){
        console.log(err);
    }
    else{
        console.log("Data of f3 arrived");
        console.log("Content is "+content);
    }
}
fs.readFile("../../../f1.txt",f1cb);
fs.readFile("../../../f2.txt",f2cb);
fs.readFile("../../../f1.txt",f3cb);
console.log("After");