console.log("I am background");

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    console.log(tab);
    if(tab.url.includes("facebook")){
        chrome.tabs.remove(tabId, function(){
            console.log("Tab removed");
        })
    }
})
