class Player{
    constructor(){
        this.name = null;
        this.index = 1;
        this.distance = 0;
        this.rank = 0;
    }

    getcount(){
        var playercountref = database.ref('playercount');
        playercountref.on("value", (data)=>{
            playercount = data.val();
        });
    }
    updatecount(count){
        database.ref('/').update({playercount: count})
    }
    update(){
        
        var playerindex  = "players/player" + this.index;
        database.ref(playerindex).set({
            name: this.name,
            distance: this.distance,
            rank:this.rank
        });
    }

    static getplayerinfo(){
        var playerinforef = database.ref('players');
        playerinforef.on("value", (data)=>{
            allplayers = data.val();
        });
    }
    getcarsatend(){
        database.ref('carsatend').on("value", (data)=>{
            this.rank = data.val();
        })
    }
    static updategetcarsatend(rank){
        database.ref('/').update({carsatend:rank})
    }
}