let fs = require("fs");
console.log("Before");
let files = ["../../../f1.txt","../../../f2.txt","../../../f3.txt","../../../f4.txt","../../../f5.txt"];
function loopSerialAsync(files,i){
    fs.readFile(files[i],function(err,content){
        if(err){
            console.log(err);
        }
        else{
            console.log(`Data of ${i+1} arrived`);
            console.log("Content is "+content);
            if(i != files.length - 1){
                loopSerialAsync(files,i+1);
            }
        }
    })
}
loopSerialAsync(files,0);