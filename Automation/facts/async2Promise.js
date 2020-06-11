let fs = require("fs");
function fsprf(path){
    return new Promise(function (resolve,reject){
        fs.readFile(path, function (err, content) {
            if (err) {
                // console.log(err);
                reject(err);
            }
            else {
                // console.log("Content is " + content);
                resolve(content);
            }
        })
    })
}
let readFilePromise = fsprf("f1.txt");
readFilePromise.then(function (data){
    console.log("Content is "+data);
})
readFilePromise.catch(function (err){
    console.log("Inside Catch");
    console.log(err);
})