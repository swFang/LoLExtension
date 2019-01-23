const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const Summoner = require("./summoner");
const GameLog = require("./gameLog");
const request = require("request");
//const summoner = require('./summoner')
var summoners = new Array();

var strGetbyName =
  "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
var get_three_matches =
  "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/";
var get_match_details = "https://na1.api.riotgames.com/lol/match/v4/matches/";
API = "RGAPI-5c55a3f8-43fb-4729-935e-6655b6b40fde";

app.get("/:name", (req, res) => {
  let name = req.params.name;
  var jsonURL = strGetbyName + name + "?api_key=" + API;
  console.log("hit api");
  //var result;
  get_data_API(jsonURL, parseNameData);
});

function get_data_API(val, cb) {
  https.get(val, res => {
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      //console.log("from new cb fn " + chunk);
      tempUser = JSON.parse(chunk);
      summoners.push(tempUser);
      return cb(JSON.parse(chunk));
    });
  });
}

function get_large_data(val, cb) {
  https.get(val, res => {
    var body = "";
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      //console.log("from new cb fn " + chunk);
      body += chunk;
    });
    res.on("end", function() {
      return cb(JSON.parse(body));
    });
  });
}

function parse_games(summoner) {
  for (var i = 0; i < summoner.Games.length; i++) {
    var API_call =
      get_match_details + summoner.Games[i].gameId + "?api_key=" + API;
    var cur_idx = 0;
    get_large_data(API_call, data => {
      //console.log(data);
      var participants = data["participantIdentities"]; 
      for( var i = 0 ; i<participants.length; i++ ){
        //console.log(participants[i]['player']['summonerName']);
        if(participants[i]['player']['summonerName'] == summoner.name) {
          //console.log(participants[i]['player']['summonerName']);
          //console.log(participants[i]['participantId']); 
          summoner.Games[cur_idx].participant_id = participants[i]['participantId'];
          console.log(cur_idx);
          console.log(summoner.Games[cur_idx]);
          cur_idx ++;
        }
      }
    });
  }
}

function parseNameData(data) {
  //res.send(data);
  //console.log("array is now " + JSON.stringify(data));
  //var json = JSON.stringify(data);
  var id = data["id"];
  var name = data["name"];
  var accID = data["accountId"];
  //console.log("json id is " + id);
  var newSummoner = new Summoner(name, id, accID);
  //console.log("name and id " + newSummoner.name + " " + newSummoner.id + "accId " + newSummoner.accID);
  /*  var i;
    for (i = 0; i<summoners.length; i++){
        console.log("number " + i + " name is " + summoners[i].name + " sumid is " + summoners[i].accID);
    } */

  var put_to =
    get_three_matches + newSummoner.accID + "?endIndex=3" + "&api_key=" + API;
  //console.log(put_to);

  get_data_API(put_to, data => {
    var matches = data["matches"];
    for (var i = 0; i < matches.length; i++) {
      cur_match = matches[i];
      var cur_lane = cur_match["lane"];
      //console.log(cur_lane);
      var cur_gameid = cur_match["gameId"];
      //console.log(cur_gameid);
      var cur_role = cur_match["role"];
      //console.log(cur_role);
      new_game = new GameLog(cur_lane, cur_gameid, cur_role);
      newSummoner.Games[i] = new_game;
      console.log(newSummoner.Games[i]);
    }
    parse_games(newSummoner);
    //console.log('summoner games = \n', newSummoner.Games);
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
