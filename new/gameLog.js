class GameLog{
    constructor (lane, gameId, role){
        this.role = role;
        this.gameId = gameId;
        this.lane  = lane;
        this.participant_id; 
        this.wards_placed;
    }

}
module.exports = GameLog; 