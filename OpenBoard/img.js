let upload = document.querySelector("#upload");
let download = document.querySelector("#download");
upload.addEventListener("change",function(e){
    let container = createBox();    
    let img = document.createElement("img");
    let file = upload.files[0];
    img.src = URL.createObjectURL(file);
    img.setAttribute("class","upload-img");
    container.appendChild(img);
    upload.value = null;
})

download.addEventListener("click",function(){
    let a = document.createElement("a");
    a.href = board.toDataURL('image/png');
    a.download = "file.png";
    a.click();
    a.remove();
})