require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
let { email, password } = require("../../credentials.json");
(async function () {
    try {
        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        await login();
        let drop = (await tab).findElement(swd.By.css("a[data-analytics='NavBarProfileDropDown']"));
        await drop.click();
        await tab.get("https://www.hackerrank.com/administration/contests");
        await waitForLoader();
        let manageBtn = await tab.findElement(swd.By.css("a[href='/administration/challenges']"));
        await manageBtn.click();
        let challengeLink = (await tab).getCurrentUrl();
        let questions = require('./questions');
        for(let i = 0 ; i < questions.length ; i++){
            await tab.get(challengeLink);
            await waitForLoader();
            await createChallenge(questions[i]);
        }
        await tab.get(challengeLink);
    } catch (err) {
        console.log(err);
    }
})();
async function login(){
    await tab.manage().setTimeouts({
        implicit: 10000
    });
    let inputBoxPromise = tab.findElement(swd.By.css("#input-1"));
    let passwordBoxP = tab.findElement(swd.By.css("#input-2"));
    let BeArr = await Promise.all([inputBoxPromise, passwordBoxP]);
    let inputBox = BeArr[0];
    let passwordBox = BeArr[1];
    let inputBoxWillBeFilledP = inputBox.sendKeys(email);
    let passwordBoxWillBeFilledP = passwordBox.sendKeys(password);
    await Promise.all([inputBoxWillBeFilledP, passwordBoxWillBeFilledP]);
    let loginBtn = await tab.findElement(swd.By.css("button[data-analytics='LoginPassword']"));
    await loginBtn.click();
}
async function createChallenge(challenge) {
    let createChallengebtn = await tab.findElement(swd.By.css("button[class='btn btn-green backbone pull-right']"));
    await createChallengebtn.click();
    let chBox = await tab.findElement(swd.By.css("#name"));
    let DescBox = await tab.findElement(swd.By.css("#preview"));
    let psBox = await tab.findElement(swd.By.css("#problem_statement-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let ifBox = await tab.findElement(swd.By.css("#input_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let cnBox = await tab.findElement(swd.By.css("#constraints-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let ofBox = await tab.findElement(swd.By.css("#output_format-container .CodeMirror.cm-s-default.CodeMirror-wrap textarea"));
    let tags = await tab.findElement(swd.By.css(".tagsinput input"));
    await chBox.sendKeys(challenge["Challenge Name"]);
    await DescBox.sendKeys(challenge["Description"]);
    await sendData("#problem_statement-container", psBox, challenge["Problem Statement"]);
    await sendData("#input_format-container", ifBox, challenge["Input Format"]);
    await sendData("#constraints-container", cnBox, challenge["Constraints"]);
    await sendData("#output_format-container", ofBox, challenge["Output Format"]);
    await tags.sendKeys(challenge["Tags"]);
    await tags.sendKeys(swd.Key.ENTER);
    let saveBtn = await (await tab).findElement(swd.By.css("button.save-challenge.btn.btn-green"));
    await saveBtn.click();
}
async function waitForLoader(){
    let loader = await tab.findElement(swd.By.css("#ajax-msg"));
    await tab.wait(swd.until.elementIsNotVisible(loader));
}
async function sendData(parentId,element,data){
    await tab.executeScript(`document.querySelector('${parentId} .CodeMirror.cm-s-default.CodeMirror-wrap div').style.height='10px'`);
    await element.sendKeys(data);
}