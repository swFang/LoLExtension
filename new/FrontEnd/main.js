var name = prompt("name?", "name");
var toBeFetched = "http://localhost:3000/" + name;

fetch(toBeFetched)
        .then(function(response){
                return response.json();
        })
        .then(function(myJson){
                console.log(JSON.stringify(myJson));
        })

















/*  var jsonURL = strGetbyName + user.summonerName + '?api_key=' + API;
    console.log(jsonURL, {mode : 'no-cors'});

    fetch(jsonURL)
        .then(function(response) {
                return response.json();
        })
        .then(function(myJson) {
                console.log(JSON.stringify(myJson));
        });

 */


        