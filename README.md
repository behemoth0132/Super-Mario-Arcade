# Title of Game

Super Mario Arcade

# HOW TO PLAY
It is a "Space Invaders-esque" type of game where you move the left and right arrow keys to move and use the space key to fire off the "red stars".
![alt text](https://i.imgur.com/4XsedCb.jpg) ![alt text](https://i.imgur.com/m5exMiC.jpg)

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
The technology used in this game includes a lot of Javascript, a decent amount of CSS and HTML. It is pretty and fun at the same time. But it isnt easy!
Below is an example of some of the design code that I used. 
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
![alt text](https://i.imgur.com/7hV8vrH.png)


# PROCESS WORK

## Initial Wireframes:
![Game Play_Game Play ](https://user-images.githubusercontent.com/81875454/116032576-f0e1c880-a62d-11eb-8fad-80ff430d7d93.png)
