# Title of Game

The Super-Smash-Bros-Arcade 

# HOW TO PLAY
Game is a fun game that allows the user to select a player and the character selected will be able to shoot lazer beams at the on coming enemies above, once they are all killed you will win the game

## Start Up Screen:
![Start Screen_Start Screen](https://user-images.githubusercontent.com/81875454/116032667-1a9aef80-a62e-11eb-9f99-bc99d59999be.png)

# HOW TO INSTALL
1. *`Fork`* and *`Clone`* this respository to your local machine
2. Open `index.html` in your browser to play

# HOW IT WORKS
Below is an example of some of the code that will be 
```
class Invaders {
    constructor(alienImage, rowsCount) {
        this.alienImage = alienImage;
        this.rowsCount = rowsCount;
        this.direction = 0;
        this.y = 40;
        this.aliens = this.initialiseAliens();
        this.bullets = [];
     
        this.speed = 0.2;
 
    }
 
 
    update() {
        for (let alien of this.aliens) {
            if (this.direction == 0) {
                alien.x+= this.speed;
            } else if (this.direction == 1) {
                alien.x-= this.speed;
            }
        }
 
    
 
        if (this.hasChangedDirection()) {
            this.moveAlienDown();
        }
         
    }
 
 
 
    hasChangedDirection() {
        for (let alien of this.aliens) {
            if (alien.x >= width - 40) {
                this.direction = 1;
                return true;
            } else if (alien.x <= 20) {
                this.direction = 0;
                return true;
            }
        }
        return false;
    }
 
    moveAlienDown() {
        for (let alien of this.aliens) {
            alien.y += 10;
        }
 
    }
 
 
    initialiseAliens() {
        let aliens = [];
        let y = 40;
        for (let i = 0; i < this.rowsCount; i++) {
            for (let x = 40; x < width - 40; x += 30) {
                aliens.push(new Alien(x, y, this.alienImage));
            }
            y += 40;
        }
        return aliens;
    }
 
    draw() {
        for (let alien of this.aliens) {
            alien.draw();
        }
 
    }
 
  
 
}
```
# FUTURE CONSIDERATIONS

I dont have anything to add at the moment however once I finish building the game I will be able predict what I will want to add.


# PROCESS WORK

## Initial Wireframes:
![Start Screen_Start Screen](https://user-images.githubusercontent.com/81875454/116032426-ac562d00-a62d-11eb-819f-2b55632a489f.png)
![Character Select_Character Select screen](https://user-images.githubusercontent.com/81875454/116032443-b6782b80-a62d-11eb-963a-7035e8c9071a.png)
![Game Play_Game Play ](https://user-images.githubusercontent.com/81875454/116032576-f0e1c880-a62d-11eb-8fad-80ff430d7d93.png)




## Scratch Work:

Scratch Work goes here
