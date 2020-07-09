const $ = require('jquery');
const fs = require('fs');
const dialog = require('electron').remote.dialog;
$(document).ready(function () {
    let db;
    let lsc;

    $(".cell-container").on("scroll", function () {
        let scrollY = $(this).scrollTop();
        let scrollX = $(this).scrollLeft();
        $("#top-left-cell,#top-row").css("top", scrollY + "px");
        $("#top-left-cell,#left-col").css("left", scrollX + "px");
    })

    $("#grid .cell").on("keyup", function () {
        let { rowId } = getRC(this);
        let ht = $(this).height();
        $($("#left-col .cell")[rowId]).height(ht);
    })

    $(".menu").on("click", function () {
        let Id = $(this).attr("id");
        $(".menu-options").removeClass("selected");
        $(`#${Id}-menu-options`).addClass("selected");
    })

    $("#bold").on("click", function () {
        $("#bold").toggleClass("isOn");
        let isBold = $("#bold").hasClass("isOn");
        $(lsc).css("font-weight", isBold ? "bolder" : "normal");
        let cellObject = getCellObject(lsc);
        cellObject.bold = isBold;
    })

    $("#underline").on("click", function () {
        $("#underline").toggleClass("isOn");
        let isUnderline = $("#underline").hasClass("isOn");
        $(lsc).css("text-decoration", isUnderline ? "underline" : "none");
        let cellObject = getCellObject(lsc);
        cellObject.underline = isUnderline;
    })

    $("#italic").on("click", function () {
        $("#italic").toggleClass("isOn");
        let isItalic = $("#italic").hasClass("isOn");
        $(lsc).css("font-style", isItalic ? "italic" : "normal");
        let cellObject = getCellObject(lsc);
        cellObject.italic = isItalic;
    })

    $("#font-family").on("change", function () {
        let fontFamily = $("#font-family").val();
        $(lsc).css("font-family", fontFamily);
        let cellObject = getCellObject(lsc);
        cellObject.fontFamily = fontFamily;
    })

    $("#font-size").on("change", function () {
        let fontSize = $("#font-size").val();
        $(lsc).css("font-size", fontSize + "px");
        let cellObject = getCellObject(lsc);
        cellObject.fontSize = fontSize;
    })

    $("#bg-color").on("change", function () {
        let bgColor = $("#bg-color").val();
        $(lsc).css("background-color", bgColor);
        let cellObject = getCellObject(lsc);
        cellObject.bgColor = bgColor;
    })

    $("#text-color").on("change", function () {
        let textColor = $("#text-color").val();
        $(lsc).css("color", textColor);
        let cellObject = getCellObject(lsc);
        cellObject.textColor = textColor;
    })

    $("#left").on("click", function () {
        $("#center").removeClass("isOn");
        $("#right").removeClass("isOn");
        $("#left").toggleClass("isOn");
        let isLeft = $("#left").hasClass("isOn");
        $(lsc).css("text-align", isLeft ? "left" : "right");
        let cellObject = getCellObject(lsc);
        cellObject.hAlign = isLeft ? "left" : "right";
    })

    $("#right").on("click", function () {
        $("#left").removeClass("isOn");
        $("#center").removeClass("isOn");
        $("#right").toggleClass("isOn");
        let isRight = $("#right").hasClass("isOn");
        $(lsc).css("text-align", isRight ? "right" : "right");
        let cellObject = getCellObject(lsc);
        cellObject.hAlign = "right";
    })

    $("#center").on("click", function () {
        $("#left").removeClass("isOn");
        $("#right").removeClass("isOn");
        $("#center").toggleClass("isOn");
        let isCenter = $("#center").hasClass("isOn");
        $(lsc).css("text-align", isCenter ? "center" : "right");
        let cellObject = getCellObject(lsc);
        cellObject.hAlign = isCenter ? "center" : "right";
    })


    $("#New").on("click", function () {
        db = [];
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCols = $(allRows[i]).find(".cell");
            let row = [];
            for (let j = 0; j < allCols.length; j++) {
                let cell = {
                    value: "",
                    formula: "",
                    upstream: [],
                    downstream: [],
                    bold: false,
                    italic: false,
                    underline: false,
                    fontFamily: "Arial",
                    fontSize: 18,
                    bgColor: "#ffffff",
                    textColor: "#000000",
                    hAlign: "right"
                }
                row.push(cell);
                $(allCols[j]).html('');
                $(allCols[j]).css("font-weight", cell.bold ? "bolder" : "normal");
                $(allCols[j]).css("font-style", cell.italic ? "italic" : "normal");
                $(allCols[j]).css("text-decoration", cell.underline ? "underline" : "none");
                $(allCols[j]).css("font-family", cell.fontFamily);
                $(allCols[j]).css("font-size", cell.fontSize + "px");
                $(allCols[j]).css("color", cell.textColor);
                $(allCols[j]).css("background-color", cell.bgColor);
                $(allCols[j]).css("text-align", cell.hAlign);
            }
            db.push(row);
        }
        $("#grid .cell").eq(0).trigger("click");
        console.log(db);
    })

    $("#Save").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let jsonData = JSON.stringify(db);
        fs.writeFileSync(fp, jsonData);
    })

    $("#Open").on("click", async function () {
        let sdb = await dialog.showOpenDialog();
        let fp = sdb.filePaths[0];
        if (fp == undefined) {
            console.log("Please select file first");
            return;
        }
        let buffer = fs.readFileSync(fp);
        db = JSON.parse(buffer);
        let allRows = $("#grid").find(".row");
        for (let i = 0; i < allRows.length; i++) {
            let allCols = $(allRows[i]).find(".cell");
            for (let j = 0; j < allCols.length; j++) {
                $(allCols[j]).html(db[i][j].value);
                $(allCols[j]).css("font-weight", db[i][j].bold ? "bolder" : "normal");
                $(allCols[j]).css("font-style", db[i][j].italic ? "italic" : "normal");
                $(allCols[j]).css("text-decoration", db[i][j].underline ? "underline" : "none");
                $(allCols[j]).css("font-family", db[i][j].fontFamily);
                $(allCols[j]).css("font-size", db[i][j].fontSize + "px");
                $(allCols[j]).css("color", db[i][j].textColor);
                $(allCols[j]).css("background-color", db[i][j].bgColor);
                $(allCols[j]).css("text-align", db[i][j].hAlign);  
            }
        }
    })

    $("#grid .cell").on("click", function () {
        let cellObject = getCellObject(this);
        let { colId, rowId } = getRC(this);
        let value = String.fromCharCode(65 + colId) + (rowId + 1);
        $("#address-input").val(value);
        $('#formula-input').val(cellObject.formula);
        if (lsc && lsc != this) {
            $("#grid .cell.selcted").removeClass("selected");
        }
        $(this).addClass("selected");
        lsc = this;
        setCellProperties(cellObject);
    })

    //value => value
    //formula => value
    $("#grid .cell").on("blur", function () {
        let cellObject = getCellObject(this);
        if (cellObject.value == $(this).html()) {
            lsc = this;
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject);
        }
        let { colId, rowId } = getRC(this);
        let nVal = $(this).html();
        updateCell(rowId, colId, nVal);
    })

    //formula => formula
    //value => formula
    $("#formula-input").on("blur", function () {
        console.log("Formula Blurred Call");
        let cellObject = getCellObject(lsc);
        if (cellObject.formula == $(this).val()) {
            return;
        }
        if (cellObject.formula) {
            console.log("Remove Formula Call");
            removeFormula(cellObject);
        }

        cellObject.formula = $(this).val();
        setFormula(cellObject);
        let nVal = evaluate(cellObject);
        let { colId, rowId } = getRC(lsc);
        updateCell(rowId, colId, nVal);
    })

    function setCellProperties(cellObject) {
        if (cellObject.bold) {
            $("#bold").addClass("isOn");
        }
        else {
            $("#bold").removeClass("isOn");
        }
        if (cellObject.underline) {
            $("#underline").addClass("isOn");
        }
        else {
            $("#underline").removeClass("isOn");
        }
        if (cellObject.italic) {
            $("#italic").addClass("isOn");
        }
        else {
            $("#italic").removeClass("isOn");
        }
        if (cellObject.hAlign) {
            $("#left").removeClass("isOn");
            $("#center").removeClass("isOn");
            $("#right").removeClass("isOn");
            $(`#${cellObject.hAlign}`).addClass("isOn");
        }
        $("#font-size").val(cellObject.fontSize);
        $("#bg-color").val(cellObject.bgColor);
        $("#text-color").val(cellObject.textColor);
        $("#font-family").val(cellObject.fontFamily);

    }

    function evaluate(cellObject) {
        let formula = cellObject.formula;
        let upstream = cellObject.upstream;
        for (let i = 0; i < upstream.length; i++) {
            let parentObject = db[upstream[i].rowId][upstream[i].colId];
            let parentVal = parentObject.value;
            let parentAddress = String.fromCharCode(upstream[i].colId + 65) + (upstream[i].rowId + 1);
            let formulaComponents = formula.split(" ");
            formulaComponents = formulaComponents.map(function (cell) {
                if (cell == parentAddress) {
                    return parentVal;
                }
                else {
                    return cell;
                }
            })
            formula = formulaComponents.join(" ");
        }
        return eval(formula);
    }

    function updateCell(rowId, colId, nVal) {
        let cellObject = db[rowId][colId];
        cellObject.value = nVal;

        $(`#grid .cell[row-id=${rowId}][col-id=${colId}]`).html(nVal);

        for (let i = 0; i < cellObject.downstream.length; i++) {
            let childObject = db[cellObject.downstream[i].rowId][cellObject.downstream[i].colId];
            let newVal = evaluate(childObject);
            updateCell(cellObject.downstream[i].rowId, cellObject.downstream[i].colId, newVal);
        }
    }

    function removeFormula(cellObject) {
        cellObject.formula = "";
        let myUpstream = cellObject.upstream;
        let { colId, rowId } = getRC(lsc);
        for (let i = 0; i < myUpstream.length; i++) {
            let parentCell = db[myUpstream[i].rowId][myUpstream[i].colId];
            let filteredArr = parentCell.downstream.filter(function (cell) {
                return (cell.colId) != colId || (cell.rowId) != rowId;
            })
            parentCell.downstream = filteredArr;
        }
        cellObject.upstream = [];
        console.log(db);
    }

    function setFormula(cellObject) {
        console.log("Set formula Call");
        let formula = cellObject.formula;
        formula = formula.replace("(", "").replace(")", "");
        let formulaComponents = formula.split(" ");
        let { colId, rowId } = getRC(lsc);
        for (let i = 0; i < formulaComponents.length; i++) {
            let charAt0 = formulaComponents[i].charCodeAt(0);
            if (charAt0 >= 65 && charAt0 <= 90) {
                let { c, r } = getParentRowCol(formulaComponents[i]);
                let parentCell = db[r][c];
                parentCell.downstream.push({
                    rowId: rowId,
                    colId: colId
                });
                cellObject.upstream.push({
                    rowId: r,
                    colId: c
                })
            }
        }
    }

    function getParentRowCol(formulaComponent) {
        let c = parseInt(formulaComponent.charCodeAt(0)) - 65;
        let r = parseInt(formulaComponent.substring(1)) - 1;
        return {
            c, r
        };
    }

    function getCellObject(elem) {
        let { colId, rowId } = getRC(elem);
        return db[rowId][colId];
    }

    function getRC(elem) {
        let colId = parseInt($(elem).attr("col-id"));
        let rowId = parseInt($(elem).attr("row-id"));
        return {
            colId, rowId
        }
    }

    function init() {
        $("#File").trigger("click");
        $("#New").trigger("click");
    }
    init();
})