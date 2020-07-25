const $ = require("jquery");
const path = require("path");
const fs = require("fs");
require("jstree");

$(document).ready(function(){

    let pPath = process.cwd();
    let pName = path.basename(pPath);
    
    let data = [{
        id : pPath,
        parent : "#",
        text : pName
    }];

    let childArr = createChildData(pPath);
    data = [...data,...childArr];

    $('#tree').jstree({
        "core" : {
            "check_callback" : true,
            "data" : data
        }
    }).on("select_node.jstree",function(e,data){
        let childP = data.node.id;
        let childArr = createChildData(childP);
        for(let i = 0 ; i < childArr.length ; i++){
            $('#tree').jstree().create_node(childP ,childArr[i], "last");
        }
    })
})

function createChildData(pPath){
    let childrens = fs.readdirSync(pPath);
    let cData = [];
    for(let i = 0 ; i < childrens.length ; i++){
        let obj = {
            id : path.join(pPath,childrens[i]),
            parent : pPath,
            text : childrens[i]
        }
        cData.push(obj);
    }

    return cData;
}