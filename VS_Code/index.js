const $ = require("jquery");
const path = require("path");
const fs = require("fs");
require("jstree");

let myMonaco,editor;
let tabArr = {};

$(document).ready(async function () {

    let pPath = process.cwd();
    let name = path.basename(pPath);

    let data = [{
        id: pPath,
        parent: "#",
        text: name
    }]
    let childArr = addCh(pPath);
    data = [...data, ...childArr];

    editor = await createEditor();

    $('#tree').jstree({
        "core": {
            "check_callback": true,
            "data": data
        }
    }).on("open_node.jstree", function (e, data) {
        let children = data.node.children;
        for (let i = 0; i < children.length; i++) {
            let gcArr = addCh(children[i]);
            for (let j = 0; j < gcArr.length; j++) {
                let doesExist = $('#tree').jstree(true).get_node(gcArr[j].id);
                if (doesExist)
                    return;
                $("#tree").jstree().create_node(children[i], gcArr[j], "last");
            }
        }
    }).on("select_node.jstree", function (e, data) {
        let fPath = data.node.id;
        let isFile = fs.lstatSync(fPath).isFile();
        if (isFile) {
            createTab(fPath);
            setData(fPath);
        }
    })
})

function addCh(parentPath) {
    let isDir = fs.lstatSync(parentPath).isDirectory();
    if (!isDir) {
        return [];
    }
    let childrens = fs.readdirSync(parentPath);
    let cdata = [];
    for (let i = 0; i < childrens.length; i++) {
        let cPath = path.join(parentPath, childrens[i]);
        let obj = {
            id: cPath,
            parent: parentPath,
            text: childrens[i]
        };
        cdata.push(obj);
    }
    return cdata;
}

function createEditor() {
    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;

    amdRequire.config({
        baseUrl: './node_modules/monaco-editor/min'
    });

    // workaround monaco-css not understanding the environment
    self.module = undefined;

    return new Promise(function (resolve, reject) {
        amdRequire(['vs/editor/editor.main'], function () {
            var editor = monaco.editor.create(document.getElementById('editor'), {
                value: [
                    'function x() {',
                    '\tconsole.log("Hello world!");',
                    '}'
                ].join('\n'),
                language: 'javascript'
            });
            myMonaco = monaco;
            resolve(editor);
        });
    })
}

function createTab(fPath){
    let fName = path.basename(fPath);
    if(!tabArr[fPath]){
        $("#tabs-row").append(`<div class="tab">
        <div class="tab-name" id="${fPath}" onclick=handleTab(this)>${fName}</div>
        <i class="fas fa-times" id="${fPath}" onclick=handleClose(this)></i>
        </div>`)
        tabArr[fPath] = fName;
    }
}

function setData(fPath) {
    let content = fs.readFileSync(fPath, "utf-8");
    editor.getModel().setValue(content);
    let ext = fPath.split(".").pop();
    if (ext == 'js') {
        ext = 'javascript';
    }
    myMonaco.editor.setModelLanguage(editor.getModel(), ext);
}

function handleTab(elem){
    let fPath = $(elem).attr("id");
    setData(fPath);
}

function handleClose(elem){
    let fPath = $(elem).attr("id");
    delete tabArr[fPath];
    $(elem).parent().remove();
    let firstPath = $(".tab .tab-name").eq(0).attr("id");
    if(firstPath){
        setData(firstPath);
    }
}
