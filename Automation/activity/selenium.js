require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
let tabWillBeOpenedPromise = tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
let { email, password } = require("../../credentials.json");
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
        let urlOfQP = tab.getCurrentUrl();
        return urlOfQP;
    })
    .then(function (urlOfQ) {
        let questionWillBeSolvedP = questionSolver();
        return questionWillBeSolvedP;
    })
    .then(function () {
        console.log("First Question Solved");
    })
    .catch(function (err) {
        console.log(err);
    });

function questionSolver() {
    let solution;
    return new Promise(function (resolve, reject) {
        let allCBTnWSP = tab.findElements(swd.By.css(".challenge-submit-btn"));
        allCBTnWSP
            .then(function (cBtnArr) {
                let cBtnWillBeClickedP = cBtnArr[1].click();
                return cBtnWillBeClickedP;
            })
            .then(function () {
                let editorialWillBeFoundP = tab.findElement(swd.By.css("a[data-attr2='Editorial']"));
                return editorialWillBeFoundP;
            })
            .then(function (editorialBtn) {
                let editorialBtnWillBeClickedP = editorialBtn.click();
                return editorialBtnWillBeClickedP;
            })
            // .then(function (){
            //     let unlockWillFoundP = tab.findElement(swd.By.css(".ui-btn.ui-btn-normal.ui-btn-primary"));
            //     return unlockWillFoundP;
            // })
            // .then(function (unlockBtn){
            //     let unlockBtnWillBeClickedP = unlockBtn.click();
            //     return unlockBtnWillBeClickedP;
            // })
            .then(function () {
                let textWillBeFoundP = tab.findElements(swd.By.css(".highlight"));
                return textWillBeFoundP;
            })
            .then(function (textArea) {
                let textWillBeCopiedP = textArea[0].getText();
                return textWillBeCopiedP;
            })
            .then(function (text) {
                solution = text;
                let problemWillBeFoundP = tab.findElement(swd.By.css("a[data-attr2='Problem']"));
                return problemWillBeFoundP;
            })
            .then(function (problemBtn) {
                let problemBtnWillBeClickedP = problemBtn.click();
                return problemBtnWillBeClickedP;
            })
            .then(function () {
                let monacoEditorWillBeFoundP = tab.findElement(swd.By.css(".inputarea"));
                return monacoEditorWillBeFoundP;
            })
            .then(function (monacoEditorArea) {
                let monacoEditorWillBeClearedP = monacoEditorArea.clear();
                return monacoEditorWillBeClearedP;
            })
            .then(function (){
                let monacoEditorWillBeFoundP = tab.findElement(swd.By.css(".inputarea"));
                return monacoEditorWillBeFoundP;
            })
            .then(function (monacoEditorArea){
                let monacoEditorWillBeClearedP = monacoEditorArea.sendKeys(solution);
                return monacoEditorWillBeClearedP;
            })
            .then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            })
    })
}