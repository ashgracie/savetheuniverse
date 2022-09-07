class Ship {
    constructor(hull, firepower, accuracy,html){
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        this.html=html
        this.update()
    }
    randomizeAlien(){
        this.hull = Math.floor(Math.random()*4+3)
        this.firepower = Math.floor(Math.random()*3+2)
        this.accuracy = Math.random()*0.2+0.6
        this.update()
    }
    takeDamageFrom(ship){
        this.hull -= ship.firepower
        this.update()
    }
    shootAt(ship){
        if(this.accuracy > Math.random()) {
            ship.takeDamageFrom(this)
        }
    }
    update(){
        this.html.innerHTML="Hull: "+this.hull+" Firepower: "+this.firepower+" Accuracy: "+this.accuracy
    }

}




let battleship, aliens;
startGame()
function startGame(){
    battleship = new Ship(20, 5, .7, document.querySelector("#ourStats"))
    aliens = []
    for(let alienIdx = 6; alienIdx > 0; alienIdx--){
        let alien = new Ship(3, 3, .6,document.querySelector("#enemyStats"))
        alien.randomizeAlien()
        aliens.push(alien);
    }
    document.querySelector("#enemy").src = "enemy"+aliens.length+".png";

    

document.querySelector("#attack").addEventListener('click', attack)

document.querySelector("#retreat").addEventListener('click', retreat)

}
function attack(){

    battleship.shootAt(aliens[0]);
        if(aliens[0].hull > 0 ){

            aliens[0].shootAt(battleship)
            if(battleship.hull <= 0){
                gameOver();
            }
        } else {
            aliens.splice(0,1);
            if(aliens.length==0){
                gameOver();
            } else {
                document.querySelector("#enemy").src = "enemy"+aliens.length+".png";
                aliens[0].update()
            }
        }
        
}


function retreat(){
    gameOver();
}


function gameOver(){
    if(battleship.hull <= 0){
        alert("Game Over. You died.")
    } else if(aliens.length == 0){
        alert("Game Over. You won!")
    } else{
        alert("Game Over! You retreated.");
    }

    console.log("Game Over");

}