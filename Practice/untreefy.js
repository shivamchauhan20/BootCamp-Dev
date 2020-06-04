let fs = require('fs');
let path = require('path');
let uniqid = require('uniqid');
function checkWhetherFile(src){
   return fs.lstatSync(src).isFile();
}
function getContent(src){
   return fs.readdirSync(src);
}
function untreefy(src,dest,obj){
    if(checkWhetherFile(src)){
        let oldName = path.basename(src);
        let newName = uniqid();
        let destPath = path.join(dest,newName);
        obj.oldName = oldName;
        obj.newName = newName;
        obj.isFile = true;
        fs.copyFileSync(src,destPath);
        console.log(`File ${oldName} from src copied to ${newName}`);
    }
    else{
        obj.name = path.basename(src);
        obj.isFile = false;
        obj.children = [];
        let childrens = getContent(src);
        for(let i = 0 ; i < childrens.length ; i++){
            let childPath = path.join(src,childrens[i]);
            let chilObj = {};
            untreefy(childPath,dest,chilObj);
            obj.children.push(chilObj);
        }
    }
}
let src = process.argv[2];
let dest = process.argv[3];
let root = {};
untreefy(src,dest,root);
console.log(root);