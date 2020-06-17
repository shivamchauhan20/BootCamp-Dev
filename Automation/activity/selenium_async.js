require("chromedriver");
let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();
let { email, password } = require("../../credentials.json");
let questions = require('./questions');
(async function () {
    try {

        await tab.get("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
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
        let profileBtn = await tab.findElement(swd.By.css(".backbone.nav_link.js-dropdown-toggle.js-link.toggle-wrap"));
        await profileBtn.click();
        let administrationBtn = await tab.findElement(swd.By.css("a[data-analytics='NavBarProfileDropDownAdministration']"));
        await administrationBtn.click();
        let manageChallengesBtn = await tab.findElement(swd.By.css("a[href='/administration/challenges']")).getAttribute("href");
        await tab.get(manageChallengesBtn);
        await tab.get(manageChallengesBtn+'/create');
        await fillChallenge();
    } catch (err) {
        console.log(err);
    }
})();
async function fillChallenge(){
    let name = await tab.findElement(swd.By.css("#name"));
    await name.sendKeys(questions[0]["Challenge Name"]);
    let description = await tab.findElement(swd.By.css("#preview"));
    await description.sendKeys(questions[0].Description);
    let inputs =  await tab.findElements(swd.By.css("textarea"));
    await inputs[2].sendKeys(questions[0]["Problem Statement"]);
    await inputs[4].sendKeys(questions[0]["Input Format"]);
    await inputs[6].sendKeys(questions[0].Constraints);
    await inputs[8].sendKeys(questions[0]["Output Format"]);
    let tags = await tab.findElement(swd.By.css("#tags_tag"));
    await tags.sendKeys(questions[0].Tags);
}
