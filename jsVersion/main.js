    function Summoner(){
            this.summonerName = "";
            this.summonerID = ""
            this.accountID = ""
            this.level;
    }

    var strGetbyName = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'
    API ="RGAPI-ec977eae-5a24-4d11-b78f-974a43db0d23"



    var user = new Summoner();
    user.summonerName = prompt("Summoner Name?", "Summoner Name");
    console.log(user.summonerName);

    var jsonURL = strGetbyName + user.summonerName + '?api_key=' + strGetbyName;

 