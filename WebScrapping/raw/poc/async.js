let fs = require('fs');
console.log("Before");
fs.readFile("f1.txt",function(err,content){
    console.log("Content is "+content);
    console.log("Actual After");
});
console.log("After");