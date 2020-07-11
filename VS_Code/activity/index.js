const $ = require("jquery");
require("jstree");

$(document).ready(function(){


    //jsTree
    let data = [];
    let currPath = process.cwd();
    let text = currPath.basename();
    data.push({"id" : currPath ,  "parent" : "#" , "text" : text})

    $('#file-explorer').jstree({
        "core" : {
            "data" : data
        }
    })

})