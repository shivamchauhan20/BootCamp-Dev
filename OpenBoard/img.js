let upload = document.querySelector("#upload");
upload.addEventListener("change",function(e){
    let img = document.createElement("img");
    let file = upload.files[0];
    img.src = URL.createObjectURL(file);
    document.body.appendChild(img);
})