const express = require('express');
const app = express(); 
const https = require('https');
const cors = require('cors');

app.use(express.json());
app.use(cors());

var strGetbyName = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
API ="RGAPI-b6df512d-0640-486f-8a6f-4f96f8284cc1";

function getRiotApi(val, cb){
    https.get(val,
        res => { 
            res.setEncoding('utf8')
            res.on('data', function(chunk){
                //console.log("from new cb fn " + chunk);
                return cb(chunk); 
            });
        }) 
}





app.get('/:name', (req,res) => {
    let name = req.params.name;
    var jsonURL = strGetbyName + name + '?api_key=' + API;
    getRiotApi(jsonURL, function(data){
        //console.log("in begining of callback " + data);
        //callback fn
        res.send(data);
        console.log("response sent was " + data);
    }); 
});

const port = process.env.PORT||3000;
app.listen(port, () => console.log(`listening on port ${port}`));