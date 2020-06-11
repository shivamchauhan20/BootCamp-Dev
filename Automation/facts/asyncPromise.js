let fs = require("fs");
console.log("Before");
let readFilePromise = fs.promises.readFile("f1.txt");
readFilePromise.then(function (data) {
    console.log("Inside Data");
    console.log("Content is " + data);
})
readFilePromise.catch(function (err) {
    console.log("Inside Catch");
    console.log(err);
})
console.log("After");