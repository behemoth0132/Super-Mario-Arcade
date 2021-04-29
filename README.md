# Title of Game

Super Mario Arcade

# HOW TO PLAY
It is a "Space Invaders-esque" type of game where you move the arrow keys left and right and use the space key to fire off the red star from mario.

## Start Up Screen:
![Super Mario Arcade Start Up Screen](https://media.giphy.com/media/aRMhVDAHKp0av9gYU2/giphy.gif)

# HOW TO INSTALL
1. *`Fork`* and *`Clone`* this respository to your local machine
2. Open `index.html` in your browser to play
![alt text](https://i.imgur.com/Pc55FJf.png)
![alt text](https://i.imgur.com/D7BTLcW.png)
![alt text](https://i.imgur.com/rdb6WnX.png)
![alt text](https://i.imgur.com/KoTr4U1.png)
# HOW IT WORKS
The technology used in this game includes a lot of Javascript, a decent amount of CSS and HTML.
Below is an example of some of the code that will be featured. 
```
let start = document.querySelector('.game-wrapper');
let ex = 10;
function swing(element) {

    function update(time) {
        
        const x = Math.sin(time / 1231) * ex;
        const y = Math.sin(time / 1458) * ex;

        element.style.transform = [
            `rotateX(${x}deg)`,
            `rotateY(${y}deg)`
        ].join(' ');

        requestAnimationFrame(update);
    }
    update(0); //love your nested functions
}

swing(start); This piece of code allows the wrap around the game to swing.
```
# FUTURE CONSIDERATIONS

I would like to add a character select screen as well as different enemies based off of the character that is seleceted to play the game.


# PROCESS WORK

## Initial Wireframes:
![Start Screen_Start Screen](https://user-images.githubusercontent.com/81875454/116032426-ac562d00-a62d-11eb-819f-2b55632a489f.png)
![Character Select_Character Select screen](https://user-images.githubusercontent.com/81875454/116032443-b6782b80-a62d-11eb-963a-7035e8c9071a.png)
![Game Play_Game Play ](https://user-images.githubusercontent.com/81875454/116032576-f0e1c880-a62d-11eb-8fad-80ff430d7d93.png)




## Scratch Work:

Scratch Work goes here
