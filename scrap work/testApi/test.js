function iss(){
    this.timestamp = 0;
    this.iss_position = 
        function location(){
            this.longitude = 0;
            this.latitude = 0;
        }
    this.message = "";
}

var strGetbyName = 'http://api.open-notify.org/iss-now.json'
//API ="RGAPI-ec977eae-5a24-4d11-b78f-974a43db0d23"



/* var user = new Summoner();
user.summonerName = prompt("Summoner Name?", "Summoner Name");

var jsonURL = strGetbyName + user.summonerName + '?api_key=' + API;
console.log(jsonURL) */
var jsonStr;
var obj;
fetch(strGetbyName)
.then(function(response) {
        return response.json();
})
.then(function(myJson) {
         jsonStr = JSON.stringify(myJson);
         obj = JSON.parse(jsonStr);
         console.log(obj);
         console.log(obj.timestamp);
});

console.log(obj.timestamp);


