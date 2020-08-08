let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");

pencil.addEventListener("click",function(){
    ctx.strokeStyle = "black";
});
eraser.addEventListener("click",function(){
    ctx.strokeStyle = "white";
})