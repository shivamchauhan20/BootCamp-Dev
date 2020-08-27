let btn = document.querySelector("#click");
let ul = document.querySelector(".list-group");
let input = document.querySelector("#url");
btn.addEventListener("click", async function () {
    let toBeBlocked = input.value;
    if (toBeBlocked) {
        await sendMessage({ type: "link", link: toBeBlocked });
        addToList(toBeBlocked);
        input.value = '';
    }
})

function sendMessage(message) {
    return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(message, function (response) {
            resolve(response);
        })
    })
}

(async function () {
    let blockList = await sendMessage({ type: "getList" });
    for (let i = 0; i < blockList.length; i++) {
        addToList(blockList[i].site);
    }
})();

function addToList(toBeBlocked) {
    let li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.innerHTML = toBeBlocked + '<i class="fa fa-times" aria-hidden="true"></i>';
    ul.appendChild(li);

    let i = document.querySelector("i");
    i.addEventListener("click", function () {
        i.parentElement.remove();
    })
}