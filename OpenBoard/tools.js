let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let sliders = document.querySelectorAll("input[type='range']");
let sticky = document.querySelector("#sticky");
let activeClass = "pencil";
let pencilSize = 1;
let eraserSize = 1;
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.miterLimit = 1;
pencil.addEventListener("click", function () {
    if (activeClass == "pencil") {
        pencilOptions.classList.add("show");
    }
    else {
        activeClass = "pencil";
        eraserOptions.classList.remove("show");
        ctx.strokeStyle = "black";
        ctx.lineWidth = pencilSize;
    }
});
eraser.addEventListener("click", function () {
    if (activeClass == "eraser") {
        eraserOptions.classList.add("show");
    }
    else {
        activeClass = "eraser";
        pencilOptions.classList.remove("show");
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserSize;
    }
});
undo.addEventListener("click", function () {
    undoMaker();
});
redo.addEventListener("click", function () {
    redoMaker();
})
document.addEventListener("keydown", function (e) {
    var evtobj = e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
        undoMaker();
    }
    if (evtobj.keyCode == 89 && evtobj.ctrlKey) {
        redoMaker();
    }
});
sticky.addEventListener("click",function(){
    createSticky();
})

function handleColor(color) {
    ctx.strokeStyle = color;
}

sliders.forEach(function (slider) {
    slider.addEventListener("change", function () {
        let value = slider.value;
        if(activeClass == "pencil"){
            pencilSize = value;
        }
        else{
            eraserSize = value;
        }
        ctx.lineWidth = value;
    })
})