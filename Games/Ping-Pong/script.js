const d = document;

const bar1 = d.querySelector("#one");
const bar2 = d.querySelector("#two");
const ball = d.querySelector("#ball");

const body = d.querySelector("body");

body.addEventListener("keydown", function (e) {
    let bound = body.clientHeight;
    let b1top = Number(bar1.style.top.slice(0, -2));
    let b2top = Number(bar2.style.top.slice(0, -2));
    if (e.key == "w" && b1top > 0) {
        bar1.style.top = (b1top - 100) + "px";
    }
    if (e.key == "s" && b1top < (bound - 180)) {
        bar1.style.top = (b1top + 100) + "px";
    }
    if (e.key == "ArrowUp" && b2top > 0) {
        bar2.style.top = (b2top - 100) + "px";
    }
    if (e.key == "ArrowDown" && b2top < (bound - 180)) {
        bar2.style.top = (b2top + 100) + "px";
    }
})

let xd = true , yd = true;
function moveBall(){
    let bodyHeight = body.clientHeight;
    let bodyWidth = body.clientWidth;    
    let ballTop = Number(ball.style.top.slice(0,-2));
    let ballLeft = Number(ball.style.left.slice(0,-2));

    if(ballTop == 0 || ballTop == bodyHeight - 100){
        yd = !yd;
    }

    if(ballLeft == 0 || ballLeft == bodyWidth - 100){
        xd = !xd;
    }

    ball.style.top = (yd ? (ballTop - 1) : (ballTop + 1)) + "px";
    ball.style.left = (xd ? (ballLeft - 1) : (ballLeft + 1)) + "px";
}

setInterval(moveBall,1);