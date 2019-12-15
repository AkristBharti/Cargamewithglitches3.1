class Game{
    constructor(){
        this.pos = createElement('h1');
    }
    Ranks = 0;
    getState(){
        var gameStateref = database.ref('gamestate');
        gameStateref.on("value", function(data){
            gamestate = data.val();
        })
    }
    update(state){
        database.ref('/').update({
            gamestate: state
        })
    }
    
    async start(){
        if (gamestate === 0){
            player = new Player();
            var playercountref = await database.ref('playercount').once("value");
            if (playercountref.exists()){
                playercount = playercountref.val();
            player.getcount();
            }
            form = new Form();
            form.display();
        }
        
        car1 = createSprite(displayWidth/4, 500);
        car1.addImage("car1",cri1);
        car2 = createSprite(displayWidth/4+200, 500);
        car2.addImage("car2", cri2);
        car3 = createSprite(displayWidth/4+200, 500);
        car3.addImage("car3", cri3);
        car4 = createSprite(displayWidth/4+200, 500,);
        car4.addImage("car4", cri4);
        cars = [car1, car2, car3, car4];

    }

 
    play(){
        form.hide();
        //text("Game is starting...",180, 250 );
        Player.getplayerinfo()
        player.getcarsatend()
        if (allplayers !== undefined){
            //var display_position = 130;
            background("red")
            image(trackimg, 0,-displayHeight*4,displayWidth, displayHeight*5 );
            var index = 0;
            var x = 100, y;
            for(var plr in allplayers){
                /*fill("red");
                }
                else{if(plr === "player"+player.index){
                    
                    fill("black");
                }
                display_position += 20;
                text(allplayers[plr].name +  " : " + allplayers[plr].distance, 120, display_position);*/
                index = index + 1;
                x = x+200;
                y = displayHeight-allplayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index === player.index){
                    ellipse(x,y,60,60)
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                

                }
            }
            
        }
        
    
    if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance += 10;
        player.update();
    }

    if (player.distance > 4000){
        gamestate = 2;
        
        player.rank += 1;
        Player.updategetcarsatend(player.rank)
        player.update();
    }
    drawSprites();
    }
    end(){
        console.log("Game Ended!")
        console.log("Player Rank : "+player.rank)
        this.pos.html("Your Rank : "+player.rank )
        this.pos.position(displayWidth/2, displayHeight/3)
        if (allplayers !== undefined){
            for(var plr in allplayers){
                if(plr === "player"+player.index)
                fill("red");
                else
                    fill("black");
                display_position += 20;
                text(allplayers[plr].name +  " : " + allplayers[plr].rank, displayWidth/2, display_position);
                }
            }
    }
}