let isPenDown = false;
let points = [];
let redoArr = [];
board.addEventListener("mousedown", function (e) {
    let top = getPosition();
    let x = e.clientX;
    let y = e.clientY - top;
    ctx.beginPath(0, 0);
    ctx.moveTo(x, y);
    isPenDown = true;
    let mdo = {
        x: x,
        y: y,
        id: "md",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    points.push(mdo);
})
board.addEventListener("mousemove", function (e) {
    if (isPenDown) {
        let top = getPosition();
        let x = e.clientX;
        let y = e.clientY - top;
        ctx.lineTo(x, y);
        ctx.stroke();
        let mmo = {
            x: x,
            y: y,
            id: "mm",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        }
        points.push(mmo);
    }
})
board.addEventListener("mouseup", function () {
    isPenDown = false;
})

function getPosition() {
    return board.getBoundingClientRect().top;
}

function redraw() {
    for (let i = 0; i < points.length; i++) {
        if (points[i].id == "md") {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.strokeStyle = points[i].color;
            ctx.lineWidth = points[i].width;
        }
        else {
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }
    }
}

function undoMaker() {
    if (points.length >= 2) {
        let tempArr = [];
        for (let i = points.length - 1; i >= 0; i--) {
            if (points[i].id == "md") {
                tempArr.unshift(points.pop());
                break;
            }
            tempArr.unshift(points.pop());
            
        }
        redoArr.push(tempArr);
        ctx.clearRect(0, 0, board.width, board.height);
        redraw();
    }
}

function redoMaker() {
    if(redoArr.length > 0){
        let tempArr = redoArr.pop();
        for(let i = 0 ; i < tempArr.length ; i++){
            points.push(tempArr[i]);
        }
        ctx.clearRect(0,0,board.width,board.height);
        redraw();
    }
}