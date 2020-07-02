const $ = require('jquery');

$(document).ready(function(){

    let lsc;
    let data = [];

    $('#grid .cell').on('click',function(){

        lsc = this;
        let rid = parseInt($(this).attr('row-id'));
        let cid = parseInt($(this).attr('col-id'));
        let cellAddr = String.fromCharCode(cid + 65);
        $('#text-input').val(cellAddr + (rid+1));
    });

    $('#grid .cell').on('blur', function(){
        
    })

    $('#formula-input').on('blur', function(){

    })

    function evalute(cellObject){
       
    }

    function deleteFormula(cellObject) {
        
    }

    function setFormula(cellObject,formula){
        formula = formula.replace('(','').replace(')','');
        let formulaComponents = formula.split(' ');
        for(let i = 0 ; i < formulaComponents ; i++){
            let chCode = formulaComponents.charCodeAt(0);
            if(chCode >= 65 && chCode <= 90){
                let upStreamAddress = getIndicesAddress(formulaComponents[i]);
                let myIndices = getIndices(cellObject);
                data[myIndices.rid][myIndices.cid].upstream.push({
                    rid : upStreamAddress.rid,
                    cid : upStreamAddress.cid
                })
                data[upStreamAddress.rid][upStreamAddress.cid].downstream.push({
                    rid : myIndices.rid,
                    cid : myIndices.cid
                })
            }
        }

    }

    function getIndices(cellObject){
        let rid = parseInt($(this).attr('row-id'));
        let cid = parseInt($(this).attr('col-id'));
        return{
            rid : rid,
            cid : cid
        }
    }

    function getIndicesAddress(cellAddress){
        let rid = parseInt(cellAddress.substring(1));
        let cid = cellAddress.charCodeAt(0) - 65;
        return{
            rid : rid - 1,
            cid : cid
        }
    }
    
    function init(){
        data = [];        
        $('#grid').find('.row').each(function(){
            let row = [];
            $(this).find('.cell').each(function(){
                let cell = {
                    value : '',
                    formula : '',
                    upstream : [],
                    downstream : []
                };
                $(this).html(cell.value);
                row.push(cell);
            })
            data.push(row);
        })
        console.log(data);
    }
    init();

})