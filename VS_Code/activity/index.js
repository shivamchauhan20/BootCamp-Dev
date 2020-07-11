const $ = require("jquery");
const nodePath = require("path");
require("jstree");

$(document).ready(function(){


    //jsTree
    let data = [];
    let currPath = process.cwd();
    let text = getPath(currPath);
    data.push({"id" : currPath ,  "parent" : "#" , "text" : text})

    $('#file-explorer').jstree({
        "core" : {
            "data" : data
        }
    })

    function getPath(path){
        return nodePath.basename(path);
    }

})