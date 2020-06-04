let fs = require("fs");
let path = require("path");
function getContent(src) {
    return fs.readdirSync(src);
}
function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile();
}
function getFolderName(extension) {
    if (extension == ".pdf" || extension == ".xlsx" || extension == ".docx" || extension == ".pptx")
        return "Document";
    if (extension == ".jpg" || extension == ".png")
        return "Media";
    if (extension == ".zip")
        return "Archive";
    if (extension == ".exe")
        return "Application";
    else
        return "Others";    
}
function organizer(src, dest) {
    if (checkWhetherFile(src)) {
        let fileName = path.basename(src);
        let folderName = getFolderName(path.extname(fileName));
        let dir = path.join(dest,folderName);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        let destPath = path.join(dir, fileName);
        fs.copyFileSync(src, destPath);
        console.log("File copied Successfully");
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
let dest = process.argv[3];
organizer(src, dest);
