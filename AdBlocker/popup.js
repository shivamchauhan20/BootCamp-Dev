console.log("I am popup");
let btn = document.querySelector(".click");
btn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, "Hello from popup", function(response) {
          console.log(response);
        });
      });
})