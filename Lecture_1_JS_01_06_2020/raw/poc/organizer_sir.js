let fs = require("fs");
let path = require("path");
let utility = require("./utility");
function getContent(src) {
    return fs.readdirSync(src);
}
function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile();
}
function getExtension(src) {
    return src.split('.').pop();
}
function getCategory(extname) {
    let types = utility.types;
    for (let category in types) {
        for (let i = 0; i < types[category].length; i++) {
            if (extname == types[category][i])
                return category;
        }
    }
    return "Others";
}
function sendFile(src, dest, category) {
    let dirName = path.join(dest, category);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName);
    }
    let destPath = path.join(dirName,path.basename(src));
    fs.copyFileSync(src, destPath);
    console.log("File copied Successfully");
}
function organizer(src, dest) {
    if (checkWhetherFile(src)) {
        let extname = getExtension(src);
        let category = getCategory(extname);
        sendFile(src,dest,category);
    }
    else {
        let childrens = getContent(src);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            organizer(childPath, dest);
        }
    }

}
let src = process.argv[2];
let dest = path.join("C:\\Users\\Shivam\\Documents", "Organized_Files");
if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}
organizer(src, dest);
