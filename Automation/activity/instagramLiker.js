let ppt = require('puppeteer');
let { email, password } = require('../../credentials.json');

(async function () {
    let browser = await ppt.launch({
        headless: false,
        slowMo: 100,
        defaultViewport: null,
        args: ["--start-maximized"]
    });

    let pkArray = await browser.pages();
    let page = pkArray[0];
    await page.goto("https://www.instagram.com/?hl=en");
    await page.waitForSelector("input[name='username']", { visible: true });
    await page.type("input[name='username']", email);
    await page.type("input[name='password']", password);
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click(".sqdOP.L3NKy.y3zKF")]);
    await page.type(".XTCLo.x3qfX", "actorsid");
    await page.waitForSelector("a[href='/actorsid/']");
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("a[href='/actorsid/']")]);
    await page.waitForSelector("a[href='/p/B3oRb0wApc4/']");
    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("a[href='/p/B3oRb0wApc4/']")]);
    let i = 0;
    do {
        await page.waitForSelector(".fr66n button");
        await page.click(".fr66n button");
        await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" }), page.click("._65Bje.coreSpriteRightPaginationArrow")]);
    } while (i < 10)
})();