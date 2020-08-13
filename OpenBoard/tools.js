let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let slider = document.querySelector("#range");
let activeClass = "pencil";
pencil.addEventListener("click", function () {
    if (activeClass == "pencil") {
        pencilOptions.classList.add("show");
    }
    else {
        activeClass = "pencil";
        eraserOptions.classList.remove("show");
        ctx.strokeStyle = "black";
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

function handleColor(color){
    ctx.strokeStyle = color;
}

function handleSlider(){
    ctx.lineWidth = slider.value;
}