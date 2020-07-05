const $ = require('jquery');
$(document).ready(function(){
    let db;
    let lsc;
    $("#grid .cell").on("click",function(){
        lsc = this;
        let {colId,rowId} = getRC(this);
        let value = String.fromCharCode(65 + colId) + (rowId + 1);
        $("#address-input").val(value);
    })

    //value => value
    //formula => value
    $("#grid .cell").on("blur",function(){
        let {colId,rowId} = getRC(this);
        db[rowId][colId].value = $(this).text();
    })

    //formula => formula
    //value => formula
    $("#formula-input").on("blur",function(){
        console.log("Formula Blurred Call");
        let cellObject = getCellObject(lsc);
        if(cellObject.formula == $(this).val().replace("(","").replace(")","")){
            return;
        }
        if(cellObject.formula){
            console.log("Remove Formula Call");
            removeFormula(cellObject);
        }
        let formula = $(this).val();
        setFormula(cellObject,formula);
    })

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

    function setFormula(cellObject,formula){
        console.log("Set formula Call");
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
        cellObject.formula = formula;
        console.log(db);
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
        console.log(db);
    }
    init();
})