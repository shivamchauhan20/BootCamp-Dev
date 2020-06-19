let fs = require('fs');
let files = ["f1.txt","f2.txt","f3.txt","f4.txt","f5.txt"];
for(let i = 0 ; i < files.length ; i++){
    let fPromise = fs.promises.readFile(files[i]);
    fPromise.then(function(data){
        console.log(" "+data);
    })
}