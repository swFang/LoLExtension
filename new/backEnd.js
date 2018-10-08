const https = require('https');

var strGetbyName = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/';
API ="RGAPI-b6df512d-0640-486f-8a6f-4f96f8284cc1";


class ApiCalls {
    getbyName(name){
        //creating correct api https
        var jsonURL = strGetbyName + name + '?api_key=' + API;
        //console.log("URL IS: " + jsonURL);
        //making the actual GET request
        https.get(jsonURL,
        res => {
            res.setEncoding('utf8');
            res.on('data', function(chunk){
                console.log(chunk);
                return chunk; 
            });
        })
    }
    
    
}

module.exports = ApiCalls;