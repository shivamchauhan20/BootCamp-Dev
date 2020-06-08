let fs = require('fs');
let cheerio = require('cheerio');
let request = require('request');
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
console.log("Sending Request");
request(url,function(err,response,html){
    console.log("Received Response");
    if(err == null && response.statusCode == 200){
        // fs.writeFileSync("index.html",html);
        console.log("File Saved");
        parseHtml(html);
    }
    else if(response.statusCode == 404){
        console.log("Page not found");
    }
    else{
        console.log(err);
        console.log(response.statusCode);
    }
});
function parseHtml(html){
    console.log("Parsing element");
    let $ = cheerio.load(html);
    let allBowlers = $('.table.bowler tbody tr');
    let playerName = "";
    let highestWickets = 0;
    for(let i = 0 ; i < allBowlers.length ; i++){
        let statsOfBowler = $(allBowlers[i]).find("td");
        let bowlerName = $(statsOfBowler[0]).text();
        let wickets = $(statsOfBowler[4]).text();
        if(wickets > highestWickets){
            highestWickets = wickets;
            playerName = bowlerName;
        }
    }
    console.log(playerName+" "+highestWickets);
}