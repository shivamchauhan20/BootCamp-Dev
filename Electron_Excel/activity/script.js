const $ = require('jquery');
const fs = require('fs');
const dialog = require('electron').remote.dialog;
$(document).ready(function(){
    let db;
    let lsc;

    $("#New").on("click",function(){
        db = [];
        let allRows = $("#grid").find(".row");
        for(let i = 0 ; i < allRows.length ; i++){
            let allCols = $(allRows[i]).find(".cell");
            let row = [];
            for(let j = 0 ; j < allCols.length ; j++){
                let col = {
                    value : "",
                    formula : "",
                    upstream : [],
                    downstream : []
                }
                row.push(col);
                $(allCols[j]).html('');
            }
            db.push(row);
        }
        $("#grid .cell").eq(0).trigger("click");
        console.log(db);
    })

    $("#Save").on("click",async function(){
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if(fp == undefined){
            console.log("Please select file first");
            return;
        }
        let jsonData = JSON.stringify(db);
        fs.writeFileSync(fp,jsonData);
    })

    $("#Open").on("click",async function(){
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if(fp == undefined){
            console.log("Please select file first");
            return;
        }
        let buffer = fs.readFileSync(fp);
        db = JSON.parse(buffer);
        let allRows = $("#grid").find(".row");
        for(let i = 0 ; i < allRows.length ; i++){
            let allCols = $(allRows[i]).find(".cell");
            for(let j = 0 ; j < allCols.length ; j++){
                $(`#grid .cell[row-id=${i}][col-id=${j}]`).html(db[i][j].value);
            }
        }
    })

    $("#grid .cell").on("click",function(){
        lsc = this;
        let cellObject = getCellObject(this);
        let {colId,rowId} = getRC(this);
        let value = String.fromCharCode(65 + colId) + (rowId + 1);
        $("#address-input").val(value);
        $('#formula-input').val(cellObject.formula);
    })

    //value => value
    //formula => value
    $("#grid .cell").on("blur",function(){
        let cellObject = getCellObject(this);
        if(cellObject.value == $(this).html()){
            lsc = this;
            return;
        }
        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let {colId,rowId} = getRC(this);
        let nVal = $(this).html();
        updateCell(rowId,colId,nVal);
    })

    //formula => formula
    //value => formula
    $("#formula-input").on("blur",function(){
        console.log("Formula Blurred Call");
        let cellObject = getCellObject(lsc);
        if(cellObject.formula == $(this).val()){
            return;
        }
        if(cellObject.formula){
            console.log("Remove Formula Call");
            removeFormula(cellObject);
        }

        cellObject.formula = $(this).val();
        setFormula(cellObject);
        let nVal = evaluate(cellObject);
        let {colId,rowId} = getRC(lsc);
        updateCell(rowId,colId,nVal);
    })

    function evaluate(cellObject){
        let formula = cellObject.formula;
        let upstream = cellObject.upstream;
        for(let i = 0 ; i < upstream.length ; i++){
            let parentObject = db[upstream[i].rowId][upstream[i].colId];
            let parentVal = parentObject.value;
            let parentAddress = String.fromCharCode(upstream[i].colId + 65) + (upstream[i].rowId + 1);
            let formulaComponents = formula.split(" ");
            formulaComponents = formulaComponents.map(function(cell){
                if(cell == parentAddress){
                    return parentVal;
                }
                else{
                    return cell;
                }
            })
            formula = formulaComponents.join(" ");
        }
        return eval(formula);
    }

    function updateCell(rowId,colId,nVal){
        let cellObject = db[rowId][colId];
        cellObject.value = nVal;

        $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(nVal);

        for(let i = 0 ; i < cellObject.downstream.length ; i++){
            let childObject = db[cellObject.downstream[i].rowId][cellObject.downstream[i].colId];
            let newVal = evaluate(childObject);
            updateCell(cellObject.downstream[i].rowId,cellObject.downstream[i].colId,newVal);
        }
    }

    function removeFormula(cellObject){       
        cellObject.formula = "";
        let myUpstream = cellObject.upstream;
        let {colId,rowId} = getRC(lsc);
        for(let i = 0 ; i < myUpstream.length ; i++){
            let parentCell = db[myUpstream[i].rowId][myUpstream[i].colId];
            let filteredArr = parentCell.downstream.filter(function(cell){
                return (cell.colId) != colId || (cell.rowId) != rowId;
            })
            parentCell.downstream = filteredArr;
        }
        cellObject.upstream = [];
        console.log(db);
    }

    function setFormula(cellObject){
        console.log("Set formula Call");
        let formula = cellObject.formula;
        formula = formula.replace("(","").replace(")","");
        let formulaComponents = formula.split(" ");
        let {colId,rowId} = getRC(lsc);
        for(let i = 0 ; i < formulaComponents.length ; i++){
            let charAt0 = formulaComponents[i].charCodeAt(0);
            if(charAt0 >= 65 && charAt0 <= 90){
                let {c,r} = getParentRowCol(formulaComponents[i]);
                let parentCell = db[r][c];
                parentCell.downstream.push({
                    rowId : rowId,
                    colId : colId
                });
                cellObject.upstream.push({
                    rowId : r,
                    colId : c
                })               
            }
        }
    }

    function getParentRowCol(formulaComponent){
        let c = parseInt(formulaComponent.charCodeAt(0)) - 65;
        let r = parseInt(formulaComponent.substring(1)) - 1;
        return {
            c,r
        };
    }

    function getCellObject(elem){
        let {colId,rowId} = getRC(elem);
        return db[rowId][colId];
    }

    function getRC(elem){
        let colId = parseInt($(elem).attr("col-id"));
        let rowId = parseInt($(elem).attr("row-id"));
        return {
            colId,rowId
        }
    }

    function init(){
        $("#New").trigger("click");
    }
    init();
})