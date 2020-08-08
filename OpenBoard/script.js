let isPenDown = false;
ctx.lineWidth = 15;
board.addEventListener("mousedown", function (e) {
    let top = getPosition();
    let x = e.clientX;
    let y = e.clientY - top;
    ctx.beginPath(0,0);
    ctx.moveTo(x, y);
    isPenDown = true;
})
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        let top = getPosition();
        let x = e.clientX;
        let y = e.clientY - top;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
})
board.addEventListener("mouseup",function(){
    isPenDown = false;
})

function getPosition(){
    return board.getBoundingClientRect().top;
}