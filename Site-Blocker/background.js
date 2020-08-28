let blockList = [];
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.type == 'getList') {
        return sendResponse(blockList);
    }
    else {
        let toBeBlocked = request.link;
        // console.log(toBeBlocked);
        // console.log(sender);
        let siteObj = { site: toBeBlocked, time: 10 };
        blockList.push(siteObj);
        await setInStorage(siteObj)
        return sendResponse(true);
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
                        chrome.browserAction.setBadgeText({ "text": "0" });
                    }
                    else {
                        chrome.browserAction.setBadgeText({ "text": blockList[i].time + "" });
                    }
                }
            }
        }
    }
}

function getTab() {
    return new Promise(function (resolve, reject) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            resolve(tabs[0]);
        });
    })
}

function removeTab(tab) {
    return new Promise(function (resolve, reject) {
        chrome.tabs.remove(tab.id, function () {
            resolve();
        })
    })
}

function setInStorage(siteObj) {
    return new Promise(async function (resolve, reject) {
        let blockListObj = await getAllFromStorage();
        blockListObj[siteObj.site] = siteObj;
        chrome.storage.sync.set(blockListObj, function () {
            resolve("Added");
        });
    })
}

function getAllFromStorage() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function (items) {
            if (items) {
                resolve(items);
            }
        });
    })
}
async function start(){
    let block = await getAllFromStorage();
    if(block){
        console.log(block);
        for(let item in block){
            blockList.push(block[item]);
        }
        console.log(blockList);
    }
}
start();