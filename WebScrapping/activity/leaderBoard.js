let request = require('request');
let fs = require('fs');
let cheerio = require('cheerio');
let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";
let leaderboard=[],count = 0;
console.log("Sending Request");
request(url, function (error, response, html) {
    console.log("Received Response");
    if (error == null && response.statusCode == 200) {
        // fs.writeFileSync("index.html",html);
        console.log("File Saved");
        parseSeriesPage(html);
    }
    else if (response.statusCode == 404) {
        console.log("Page not found");
    }
    else {
        console.log(error);
        console.log(response.statusCode);
    }
});
function parseSeriesPage(html) {
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    let allCards = $('.col-md-8.col-16');
    for (let i = 0; i < allCards.length; i++) {
        let mType = $(allCards[i]).find(".small").text();
        let isValid = mType.includes("ODI") || mType.includes("T20I");
        if (isValid) {
            // console.log(mType);
            let anchors = $(allCards[i]).find("a");
            let link = $(anchors[0]).attr("href");
            let fullLink = `https://www.espncricinfo.com${link}`;
            // console.log(fullLink);
            handleEachMatch(fullLink);
            count++;
        }
    }
}
function handleEachMatch(link) {
    request(link, function (error, response, html) {
        if (error == null && response.statusCode == 200) {
            // fs.writeFileSync("index.html",html);
            parseMatch(html);
            count--;
            if(count==0){
                console.table(leaderboard);
            }
        }
        else if (response.statusCode == 404) {
            console.log("Page not found");
        }
        else {
            console.log(error);
            console.log(response.statusCode);
        }
    });
}
function parseMatch(html) {
    let $ = cheerio.load(html);
    let format = $(".desc.text-truncate").text();
    if (format.includes("ODI") == true) {
        format = "ODI"
    } else {
        format = "T20I"
    }
    let innings = $('.card.content-block.match-scorecard-table');
    innings = innings.splice(0,2);
    for(let i = 0 ; i < innings.length ; i++){
        let teamName = $(innings[i]).find("h5").text();
        teamName = teamName.split("Innings").shift();
        let players = $(innings[i]).find(".table.batsman tbody tr");
        for(let j = 0 ; j < players.length ; j++){
            let bCols = $(players[j]).find("td");
            let isBatsmanRow = $(bCols).hasClass("batsman-cell");
            if(isBatsmanRow){
                let batsmanName = $(bCols[0]).text();
                let runs = $(bCols[2]).text();
                // console.log(batsmanName+" "+runs);
                addToLeaderBoard(batsmanName,teamName,format,Number(runs));
            }
        }
        // console.log("###############################");
    }
    // console.log("```````````````````````````````````````````````````````````````````");
}
function addToLeaderBoard(name,teamName,format,runs) {
    for(let i = 0 ; i < leaderboard.length ; i++){
        let cPlayerInfo = leaderboard[i];
        let match = cPlayerInfo.Name==name && cPlayerInfo.TeamName==teamName && cPlayerInfo.Format==format;
        if(match){
            cPlayerInfo.TotalRuns += runs;
            return;
        }
    }
    let playerInfo = {};
    playerInfo.Name = name;
    playerInfo.TeamName = teamName;
    playerInfo.Format = format;
    playerInfo.TotalRuns = runs;
    leaderboard.push(playerInfo);
}