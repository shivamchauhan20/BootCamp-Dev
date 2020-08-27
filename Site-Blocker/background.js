let blockList = [];
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.type == 'getList'){
        return sendResponse(blockList);
    }
    else{
        let toBeBlocked = request.link;
        console.log(toBeBlocked);
        console.log(sender);
        sendResponse(true);
        blockList.push({ site: toBeBlocked, time: 10 });
    }
});

setInterval(init, 1000);

async function init() {
    if (blockList.length > 0) {
        let tab = await getTab();
        if (tab) {
            for (let i = 0; i < blockList.length; i++) {
                if (tab.url.includes(blockList[i].site)) {
                    blockList[i].time--;
                    if (blockList[i].time <= 0) {
                        await removeTab(tab);
                        chrome.browserAction.setBadgeText({"text":"0"});
                    }
                    else{
                        chrome.browserAction.setBadgeText({"text":blockList[i].time + ""});
                    }
                }
            }
        }
    }
}

function getTab() {
    return new Promise(function(resolve,reject){
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
            resolve(tabs[0]);
        });
    })
}

function removeTab(tab){
    return new Promise(function(resolve,reject){
        chrome.tabs.remove(tab.id, function () {
           resolve();
        })
    })
}