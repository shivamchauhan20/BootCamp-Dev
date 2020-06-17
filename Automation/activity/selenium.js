require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let { email, password } = require("../../credentials.json");
let gCodesElementsP, gInputArea, gTextArea;
tabWillBeOpenedPromise
    .then(function () {
        let findTimeOutP = tab.manage().setTimeouts({
            implicit: 10000
        });
        return findTimeOutP;
    })
    .then(function () {
        let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
        let passwordBoxP = tab.findElement(swd.By.css("#input-2"));
        return Promise.all([inputBoxPromise, passwordBoxP]);
    })
    .then(function (BeArr) {
        let inputBox = BeArr[0];
        let passwordBox = BeArr[1];
        let inputBoxWillBeFilledP = inputBox.sendKeys(email);
        let passwordBoxWillBeFilledP = passwordBox.sendKeys(password);
        return Promise.all([inputBoxWillBeFilledP, passwordBoxWillBeFilledP]);
    })
    // .then(function () {
    //     let passwordBoxP = tab.findElement(swd.By.css("#input-2"));
    //     return passwordBoxP;
    // })
    // .then(function (passwordBox) {
    //     let passwordBoxWillBeFilledP = passwordBox.sendKeys(password);
    //     return passwordBoxWillBeFilledP;
    // })
    .then(function () {
        let loginBtnWillBeFoundP = tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
        return loginBtnWillBeFoundP;
    })
    .then(function (loginBtn) {
        let loginBtnWillBeClickedP = loginBtn.click();
        return loginBtnWillBeClickedP;
    })
    .then(function () {
        let IpBtnWillBeFoundP = tab.findElement(swd.By.css("h3[title='Interview Preparation Kit']"));
        return IpBtnWillBeFoundP;
    })
    .then(function (IpBtn) {
        let IpBtnWillBeClickedP = IpBtn.click();
        return IpBtnWillBeClickedP;
    })
    .then(function () {
        let wUCBtnWillBeFoundP = tab.findElement(swd.By.css("a[data-attr1='warmup']"));
        return wUCBtnWillBeFoundP;
    })
    .then(function (wUCBtn) {
        let wUCBtnWillBeClickedP = wUCBtn.click();
        return wUCBtnWillBeClickedP;
    })
    .then(function () {
        let allQtagP = tab.findElements(swd.By.css("a.js-track-click.challenge-list-item"));
        return allQtagP;
    })
    .then(function (anchors) {
        let allQLinksP = anchors.map(function (a) {
            return a.getAttribute("href");
        })
        return Promise.all(allQLinksP);
    })
    .then(function (links) {
        console.log(links);
        let quesPromise = questionSolver(links[0]);
        for (let i = 1; i < links.length; i++) {
            quesPromise = quesPromise.then(function () {
                return questionSolver(links[i]);
            })
        }
        let lastQuestionWillBeSolvedP = quesPromise;
        return lastQuestionWillBeSolvedP;
    })
    .then(function () {
        console.log("All Questions Solved");
    })
    .catch(function (err) {
        console.log(err);
    });

function questionSolver(url) {
    return new Promise(function (resolve, reject) {
        let quesPageWillBeOpened = tab.get(url);
        quesPageWillBeOpened
            .then(function () {
                let editorialWillBeFoundP = tab.findElement(swd.By.css("a[data-attr2='Editorial']"));
                return editorialWillBeFoundP;
            })
            .then(function (editorialBtn) {
                let editorialBtnWillBeClickedP = editorialBtn.click();
                return editorialBtnWillBeClickedP;
            })
            .then(function () {
                let unlockWillBeFoundP = handleLockBtn();
                return unlockWillBeFoundP;
            })
            .then(function () {
                let codeWillBeFoundP = getCode();
                return codeWillBeFoundP;
            })
            .then(function (code) {
                let codeWillBePastedP = pasteCode(code);
                return codeWillBePastedP;
            })
            .then(function () {
                let submitBtnWillBeFoundP = tab.findElement(swd.By.css("button.hr-monaco-submit"));
                return submitBtnWillBeFoundP;
            })
            .then(function (submitBtn) {
                let submitBtnWillBeClickedP = submitBtn.click();
                return submitBtnWillBeClickedP;
            })
            // .then(function () {
            //     let textWillBeFoundP = tab.findElements(swd.By.css(".highlight"));
            //     return textWillBeFoundP;
            // })
            // .then(function (textArea) {
            //     let textWillBeCopiedP = textArea[0].getText();
            //     return textWillBeCopiedP;
            // })
            // .then(function () {
            //     let problemWillBeFoundP = tab.findElement(swd.By.css("a[data-attr2='Problem']"));
            //     return problemWillBeFoundP;
            // })
            // .then(function (problemBtn) {
            //     let problemBtnWillBeClickedP = problemBtn.click();
            //     return problemBtnWillBeClickedP;
            // })
            // .then(function () {
            //     let monacoEditorWillBeFoundP = tab.findElement(swd.By.css("textarea"));
            //     return monacoEditorWillBeFoundP;
            // })
            // .then(function (monacoEditorArea) {
            //     let monacoEditorWillBeClearedP = monacoEditorArea.sendKeys();
            //     return monacoEditorWillBeClearedP;
            // })
            // .then(function () {
            //     let monacoEditorWillBeFoundP = tab.findElement(swd.By.css(".inputarea"));
            //     return monacoEditorWillBeFoundP;
            // })
            // .then(function (monacoEditorArea) {
            //     let monacoEditorWillBeClearedP = monacoEditorArea.sendKeys(solution);
            //     return monacoEditorWillBeClearedP;
            // })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            })
    })
}
function handleLockBtn() {
    return new Promise(function (resolve, reject) {
        let lockBtnWillBeFoundP = tab.findElement(swd.By.css(".ui-btn.ui-btn-normal.ui-btn-primary"));
        lockBtnWillBeFoundP
            .then(function (lockBtn) {
                let lockBtnWillBeClickedP = lockBtn.click();
                console.log("inside click");
                return lockBtnWillBeClickedP;
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                console.log("Lock Button wasn't found");
                resolve();
            })
    })
}
function getCode() {
    return new Promise(function (resolve, reject) {
        let allLangsP = tab.findElements(swd.By.css(".hackdown-content h3"));
        let allCodesP = tab.findElements(swd.By.css(".hackdown-content .highlight"));
        let bothArrayP = Promise.all([allLangsP, allCodesP]);
        bothArrayP
            .then(function (bothArrays) {
                let langsElement = bothArrays[0];
                gCodesElementsP = bothArrays[1];
                let allLangTextP = [];
                for (let i = 0; i < langsElement.length; i++) {
                    let cLangTextP = langsElement[i].getText();
                    allLangTextP.push(cLangTextP);
                }
                return Promise.all(allLangTextP);
            })
            .then(function (allLangText) {
                let codeofCP;
                for (let i = 0; i < allLangText.length; i++) {
                    if (allLangText[i].includes("C++")) {
                        codeofCP = gCodesElementsP[i].getText();
                        break;
                    }
                }
                return codeofCP;
            })
            .then(function (cCode) {
                resolve(cCode);
            })
            .catch(function (err) {
                reject(err);
            })
    })
}
function pasteCode(code) {
    return new Promise(function (resolve, reject) {
        let problemWillBeFoundP = tab.findElement(swd.By.css("a[data-attr2='Problem']"));
        problemWillBeFoundP
            .then(function (problemBtn) {
                let problemBtnWillBeClickedP = problemBtn.click();
                return problemBtnWillBeClickedP;
            })
            .then(function () {
                let testBtnWillBeFoundP = tab.findElement(swd.By.css(".custom-input-checkbox"));
                return testBtnWillBeFoundP;
            })
            .then(function (testBtn) {
                let testButtonWillBeClicked = testBtn.click();
                return testButtonWillBeClicked;
            })
            .then(function () {
                let inputAreaWillBeFoundP = tab.findElement(swd.By.css(".custominput"));
                return inputAreaWillBeFoundP;
            })
            .then(function (inputArea) {
                gInputArea = inputArea;
                let inputAreaWillBeFilledP = inputArea.sendKeys(code);
                return inputAreaWillBeFilledP;
            })
            .then(function () {
                // let selectP = gInputArea.sendKeys(swd.Key.chord(swd.Key.CONTROL, "a"));
                let selectP = gInputArea.sendKeys(swd.Key.CONTROL + "a");
                return selectP;
            })
            .then(function () {
                // let cutP = gInputArea.sendKeys(swd.Key.chord(swd.Key.CONTROL, "x"));
                let cutP = gInputArea.sendKeys(swd.Key.CONTROL + "x");
                return cutP;
            })
            .then(function () {
                let tAreaP = tab.findElement(swd.By.css("textarea"));
                return tAreaP;
            })
            .then(function (tArea) {
                gTextArea = tArea;
                // let selectP = tArea.sendKeys(swd.Key.chord(swd.Key.CONTROL, "a"));
                let selectP = tArea.sendKeys(swd.Key.CONTROL + "a");
                return selectP;
            })
            .then(function () {
                // let copyP = gTextArea.sendKeys(swd.Key.chord(swd.Key.CONTROL, "v"));
                let copyP = gTextArea.sendKeys(swd.Key.CONTROL + "v");
                return copyP;
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            })
    })
}