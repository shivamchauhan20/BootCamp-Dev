let ul = document.querySelector("ul");
let input = document.querySelector("#item");
let submitBtn = document.querySelector("#click");

submitBtn.addEventListener("click",function(){
    let val = input.value;
    let li = document.createElement("li");
    li.innerText = val;
    ul.appendChild(li);
    input.value = "";
})