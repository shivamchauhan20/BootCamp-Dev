const $ = require("jquery");
const path = require("path");
const fs = require("fs");
require("jstree");

$(document).ready(function () {

    let pPath = process.cwd();
    let name = path.basename(pPath);

    let data = [{
        id: pPath,
        parent: "#",
        text: name
    }]
    let childArr = addCh(pPath);
    data = [...data, ...childArr];

    const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;

    amdRequire.config({
        baseUrl: './node_modules/monaco-editor/min'
    });

    // workaround monaco-css not understanding the environment
    self.module = undefined;

    amdRequire(['vs/editor/editor.main'], function () {
        var editor = monaco.editor.create(document.getElementById('editor'), {
            value: [
                'function x() {',
                '\tconsole.log("Hello world!");',
                '}'
            ].join('\n'),
            language: 'javascript'
        });
    });

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