let fs = require('fs');
let path = require('path');
function checkWhetherFile(src){
   return fs.lstatSync(src).isFile();
}
function getContent(src){
   return fs.readdirSync(src);
}
function flatView(src,toPrint){
    if(checkWhetherFile(src)){
        console.log(toPrint+" *");
    }
    else{
        console.log(toPrint);
        let childrens = getContent(src);
        for(let i = 0 ; i < childrens.length ; i++){
            let childPath = path.join(src,childrens[i]);
            cToPrint = path.join(toPrint,path.basename(childPath));
            flatView(childPath,cToPrint);
        }
    }
}
function treeView(src,indent){
    if(checkWhetherFile(src)){
        console.log(indent+path.basename(src));
    }
    else{
        console.log(indent+path.basename(src));
        let childrens = getContent(src);
        for(let i = 0 ; i < childrens.length ; i++){
            let childPath = path.join(src,childrens[i]);
            treeView(childPath,indent+"___");
        }
    }
}
let src = process.argv[2];
console.log("Flat View");
flatView(src,path.basename(src));
console.log("Tree View");
treeView(src,"");