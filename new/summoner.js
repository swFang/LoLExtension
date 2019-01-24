const Game = require('./gameLog');

class Summoner{
    constructor (name, id, accID) {
        this.name = name; 
        this.id = id;
        this.accID = accID;
        this.Games = new Array(); 
        this.finished = 0;
    }
}

module.exports = Summoner;