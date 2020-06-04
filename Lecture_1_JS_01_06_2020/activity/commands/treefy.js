module.exports.treefyFn = function () {
    let src = arguments[0];
    let dest = arguments[1];
    let obj = JSON.parse(fs.readFileSync(path.join(src, "metadata.json"), 'utf8'));
    treefy(src, dest, obj);
}
let fs = require("fs");
let path = require("path");
function treefy(src, dest, obj) {
    if (obj.isFile) {
        let srcPath = path.join(src, obj.newName);
        let destPath = path.join(dest, obj.oldName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`File ${obj.newName} from src copied to ${obj.oldName}`);
    }
    else {
        var dir = path.join(dest, obj.name)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        for (let i = 0; i < obj.children.length; i++) {
            let destPath = path.join(dest, obj.name);
            treefy(src, destPath, obj.children[i]);
        }
    }
}
