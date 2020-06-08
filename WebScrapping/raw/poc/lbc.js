let request = require('request');
let fs = require('fs');
let cheerio = require('cheerio');
let url = "https://www.espncricinfo.com/series/19322/commentary/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
console.log("Sending Request");
request(url,function(error,response,html){
    console.log("Received Response");
    if(error==null && response.statusCode==200){
        fs.writeFileSync("index.html",html);
        console.log("File Saved");
        parseHtml(html);
    }
    else if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        console.log(error);
        console.log(response.statusCode);
    }
});
function parseHtml(html){
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    // let title = $('title');
    // let title = $('h5.header-title.label');
    // console.log(title.text());
    let elementArr = $('.match-comment-wrapper');
    // let lbc = $(elementArr.html()).text();
    let lbc = $(elementArr[0]).text();
    console.log(lbc);
}