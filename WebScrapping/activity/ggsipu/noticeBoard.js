let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let mail = require("./mail");
let url = "http://www.ipu.ac.in/notices.php";
let allNotices = [];
console.log("Sending Request");
request(url, function (err, response, html) {
    if (err == null && response.statusCode == 200) {
        console.log("Received Response");
        parseHtml(html);
    }
    else if (response.statusCode == 404) {
        console.log("Page not found");
    }
    else {
        console.log(err);
        console.log(response.statusCode);
    }
});
function parseHtml(html) {
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    let cNotices = [];
    let tBodyArr = $('.table-box table tbody');
    let trArr = $(tBodyArr[1]).find("tr");
    let htmlFile = "";
    htmlFile += fs.readFileSync("index.html");
    let allNoticesHtml = "";
    for (let i = 0; i < trArr.length; i++) {
        if($(trArr[i]).hasClass("item-collapse")){
            break;
        }
        let currNotice = $(trArr[i]).find("td");
        let notice = $(currNotice[0]).text();
        let noticeDate = $(currNotice[1]).text();
        let noticeObj = {};
        noticeObj.notice = notice;
        noticeObj.date = noticeDate;
        cNotices.push(noticeObj);
        allNoticesHtml += `<tr><td>${notice}</td><td>${noticeDate}</td></tr>`
    }
    if(allNotices.length == 0){
        allNotices = cNotices;
        console.table(allNotices);
        htmlFile = htmlFile.replace("{{content}}",allNoticesHtml);
        mail.sendMail(htmlFile);
    }
    else{
        if(allNotices.length < cNotices.length){
            let newNotices = cNotices.length - allNotices.length;
            for(let i = 0 ; i < newNotices ; i++){
                allNotices.unshift(cNotices[i]);
                console.table(cNotices[i]);
            }
        }
        else{
            console.log("No new Notices");
        }
    }   
}