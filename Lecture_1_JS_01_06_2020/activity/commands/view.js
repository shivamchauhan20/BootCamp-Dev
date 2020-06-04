module.exports.view = function () {
    let src = arguments[0];
    let mode = arguments[1];
    if (mode == "-t") {
        treeView(src, "");
    }
    else {
        flatView(src, path.basename(src));
    }
}
let fs = require("fs");
let path = require("path");

function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile();
}

function getContent(src) {
    return fs.readdirSync(src);
}

function treeView(src, indent) {
    if (checkWhetherFile(src)) {
        console.log(indent + path.basename(src) + " *");
    }
    else {
        console.log(indent + path.basename(src));
        let childrens = getContent(src);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            treeView(childPath, indent + "___");
        }
    }
}
function flatView(src, toPrint) {
    if (checkWhetherFile(src)) {
        console.log(toPrint + " *");
    }
    else {
        console.log(toPrint);
        let childrens = getContent(src);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(src, childrens[i]);
            let cToPrint = path.join(toPrint, path.basename(childPath));
            flatView(childPath, cToPrint);
        }
    }
}