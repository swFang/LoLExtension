const express = require('express');
const app = express(); 
const https = require('https');
const cors = require('cors');
const Summoner = require('./summoner');
//const summoner = require('./summoner')
var summoners = new Array();


app.use(express.json());
app.use(cors());

var strGetbyName = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
API ="RGAPI-d0c3d0ab-e36d-47e9-8401-f0fd676f43ac";

function getByName(val, cb){
    https.get(val,
        res => { 
            res.setEncoding('utf8')
            res.on('data', function(chunk){
                console.log("from new cb fn " + chunk);
                tempUser = JSON.parse(chunk);
                summoners.push(tempUser);
                return cb(JSON.parse(chunk)); 
            });
        }) 
}

/* function getGameData(val, cb){
    https.get(val,
        res => { 
            res.setEncoding('utf8')
            res.on('data', function(chunk){
                console.log("from new cb fn " + chunk);
                console.log(JASON.stringify (JSON.parse(chunk)));
            });
        }) 
}
 */

/* function parseNameData(data){
    //res.send(data);
    //console.log("array is now " + JSON.stringify(data));
    //var json = JSON.stringify(data);
    var id = data["id"];
    var name = data["name"];
    var accID = data["accountId"];
    //console.log("json id is " + id);
    var newSummoner =  new Summoner(name, id, accID);
    console.log("name and id " + newSummoner.name + " " + newSummoner.id);
    summoners.push(newSummoner);
    
    var i;
    for (i = 0; i<summoners.length; i++){
        console.log("number " + i + "name is" + summoners[i].name + "sumid is " + summoners[i].accID);
    }
}
 */

app.get('/:name', (req,res) => {
    let name = req.params.name;
    var jsonURL = strGetbyName + name + '?api_key=' + API;
    //var result; 
    getByName(jsonURL, parseNameData);
});


const port = process.env.PORT||3000;
app.listen(port, () => console.log(`listening on port ${port}`));