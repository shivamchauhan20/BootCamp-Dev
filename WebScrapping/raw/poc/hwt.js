let request = require('request');
let fs = require('fs');
let cheerio = require('cheerio');
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
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
    let players = $('.table.bowler tbody tr');
    let maxWickets = 0;
    let hwt = "";
    for(let i = 0 ; i < players.length ; i++){
        let allColOfAPlayer = $(players[i]).find("td");
        let cPlayerName = $(allColOfAPlayer[0]).text();
        let wickets = $(allColOfAPlayer[4]).text();
        // console.log(cPlayerName+" "+wickets);
        if(Number.parseInt(wickets) > maxWickets){
            maxWickets = Number.parseInt(wickets);
            hwt = cPlayerName;
        }
    }
    console.log("Highest Wicket Taker : "+hwt);
    console.log("Wickets : "+maxWickets);
}