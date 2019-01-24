const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const Summoner = require("./summoner");
const GameLog = require("./gameLog");
const request = require("request");
//const summoner = require('./summoner')
var queue = require("queue");
var waitUntil = require("wait-until");

var strGetbyName =
  "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
var get_three_matches =
  "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/";
var get_match_details = "https://na1.api.riotgames.com/lol/match/v4/matches/";
API = "RGAPI-5c55a3f8-43fb-4729-935e-6655b6b40fde";

app.get("/:name", (req, res) => {
  console.log("hit api");
  let name = req.params.name;
  var jsonURL = strGetbyName + name + "?api_key=" + API;
  get_data_API(jsonURL, create_Sum);
});

function get_data_API(val, cb) {
  https.get(val, res => {
    let data = "";
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      data += chunk;
    });

    res.on("end", function() {
      return cb(JSON.parse(data));
    });
  });
}

function get_large_data(val, cb) {
  https.get(val, res => {
    let body = "";
    res.setEncoding("utf8");
    res.on("data", function(chunk) {
      body += chunk;
    });
    res.on("end", function() {
      return cb(JSON.parse(body));
    });
  });
}

function match_ids(person, dat) {
  participant_info = dat["participantIdentities"];
  for (var i = 0; i < participant_info.length; i++) {
    if (
      participant_info[i]["player"]["summonerId"] == person.id &&
      participant_info[i]["player"]["summonerName"] == person.name
    ) {
      for (var k = 0; k < person.Games.length; k++) {
        if (dat["gameId"] == person.Games[k].gameId) {
          person.Games[k].participant_id = participant_info[i]["participantId"];
          var temp = dat["participants"];
          person.Games[k].wards_placed = temp[i]["stats"]["wardsPlaced"];
        }
      }
    }
  }
  //console.log(person.Games);
}

function parse_games(summoner, cb) {
  for (var i = 0; i < summoner.Games.length; i++) {
    var API_call =
      get_match_details + summoner.Games[i].gameId + "?api_key=" + API;
    get_large_data(API_call, data => {
      match_ids(summoner, data, print_games);
      console.log("inside " + summoner.Games);
    });
  }
  //console.log(summoner.Games);
}

function get_game_info(summoner) {
  var put_to =
    get_three_matches + summoner.accID + "?endIndex=3" + "&api_key=" + API;

  get_data_API(put_to, data => {
    var matches = data["matches"];
    for (var i = 0; i < matches.length; i++) {
      cur_match = matches[i];
      var cur_lane = cur_match["lane"];
      var cur_gameid = cur_match["gameId"];
      var cur_role = cur_match["role"];
      new_game = new GameLog(cur_lane, cur_gameid, cur_role);
      summoner.Games[i] = new_game;
    }
    parse_games(summoner, print_games);
  });
}

function create_Sum(data) {
  var id = data["id"];
  var name = data["name"];
  var accID = data["accountId"];
  var newSummoner = new Summoner(name, id, accID);

  get_game_info(newSummoner);

  waitUntil()
    .interval(500)
    .times(10)
    .condition(function() {
      return (newSummoner.finished == 1) ? true : false;
    })
    .done(function(result) {
      // do stuff
      print_games(newSummoner);
    });
}

function print_games(summoner) {
  console.log(summoner.Games.length);
  console.log(summoner.Games);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
