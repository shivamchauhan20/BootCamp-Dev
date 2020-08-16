function createBox(){
    let stickyPad = document.createElement("div");
    let navBar = document.createElement("div");
    let minimize = document.createElement("div");
    let closed = document.createElement("div");
    let container = document.createElement("div");

    stickyPad.appendChild(navBar);
    stickyPad.appendChild(container);
    navBar.appendChild(minimize);
    navBar.appendChild(closed);

    stickyPad.setAttribute("class", "stickyPad");
    navBar.setAttribute("class", "navBar");
    minimize.setAttribute("class", "minimize"); 
    closed.setAttribute("class", "close");
    container.setAttribute("class", "container");

    document.body.append(stickyPad);

    let initialX = null , initialY = null;
    let isStickyDown = false;
    navBar.addEventListener("mousedown",function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        isStickyDown = true;
    })
    board.addEventListener("mousemove",function(e){
        if(isStickyDown){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            let {top,left} = stickyPad.getBoundingClientRect();
            stickyPad.style.top = top + dy + "px";
            stickyPad.style.left = left + dx + "px";

            initialX = finalX;
            initialY = finalY;
        }
    })
    window.addEventListener("mouseup",function(){
        isStickyDown = false;
    })

    closed.addEventListener("click",function(){
        stickyPad.remove();
    })

    let flag = true;
    minimize.addEventListener("click",function(){
        if(flag){
            container.style.display = "none";
        }
        else{
            container.style.display = "block";
        }
        flag = !flag;
    })

    return container;
}