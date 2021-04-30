const KEY_CODE_LEFT = 37;//Left Key 
const KEY_CODE_RIGHT = 39;//Right Key
const KEY_CODE_SPACE = 32;//Space bar
//Area of the game//
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 20;//global variable that sets the width of the player
const PLAYER_MAX_SPEED = 600.0;//how fast the player should move
const LASER_MAX_SPEED = 300.0;//speed of each laser
const LASER_COOLDOWN = 0.5;//speed in which how quick the hero can shoot 
//Enemy Positioning
const ENEMIES_PER_ROW = 10;//enemies per row
const ENEMY_HORIZONTAL_PADDING = 80;//padding
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;
const ENEMY_COOLDOWN = 5.0;//speed in between how quick the next shot comes form enemy

const GAME_STATE = {//global variable contains whole state of the game, positions of the player all of the enemies and all of the lasers 
  lastTime: Date.now(),//record the absolute time of the previous frame
  leftPressed: false,//to know which keys are pressed 
  rightPressed: false,//to know which keys are pressed 
  spacePressed: false,//to know which keys are pressed 
  playerX: 0, //
  playerY: 0,
  playerCooldown: 0,
  lasers: [],
  enemies: [],
  enemyLasers: [],
  gameOver: false
};

let start = document.querySelector('.game-wrapper');//pendulum swing code to allow the game to swing
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

swing(start);

function rectsIntersect(r1, r2) { //if these conditions are not met the lasers are not intersect 
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

function setPosition(el, x, y) {//sets the position of our elements, takes in a DOM element and x and y position
  el.style.transform = `translate(${x}px, ${y}px)`;//want the value of our variable 
}

function clamp(v, min, max) {
  if (v < min) {
    return min;//checks if the input value is smaller than the minimum
  } else if (v > max) {//checks if the input value is smaller than the maximum 
    return max;
  } else {
    return v;//if neither it falls in the middle and returns it
  }
}

function rand(min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 1;
  return min + Math.random() * (max - min);
}

function createPlayer($container) {//figures out the position of the player
  GAME_STATE.playerX = GAME_WIDTH / 2;//which is 400 puts the player in the middle of the screen
  GAME_STATE.playerY = GAME_HEIGHT - 50;//which is 550 a little bit off
  const $player = document.createElement("img");//create the player element which is an image
  $player.src = "PngItem_37070.png";//set the attributes the image source
  $player.className = "player";//class name 
  $container.appendChild($player);//append the child to an existing element in the DOM "container"
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);//selects the player DOM element and changes the player image to the correct position 
}


function destroyPlayer($container, player) {
  $container.removeChild(player);
  GAME_STATE.gameOver = true;
  const audio = new Audio("smb_gameover.wav");
  audio.play();
}

function updatePlayer(dt, $container) {//checks which keys have been pressed and updates the player
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= dt * PLAYER_MAX_SPEED;//to move the player according to max speed
  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += dt * PLAYER_MAX_SPEED;
  }

  GAME_STATE.playerX = clamp(//this allows the player not to go to the complete edge of the screen
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  if (GAME_STATE.spacePressed && GAME_STATE.playerCooldown <= 0) {
    createLaser($container, GAME_STATE.playerX, GAME_STATE.playerY);
    GAME_STATE.playerCooldown = LASER_COOLDOWN;
  }
  if (GAME_STATE.playerCooldown > 0) {
    GAME_STATE.playerCooldown -= dt;
  }

  const player = document.querySelector(".player");
  setPosition(player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function createLaser($container, x, y) {//creates the laser
  const $element = document.createElement("img");
  $element.src = "pngarea.com_mario-star-png-6698854.png";
  $element.className = "laser";//move the laser to the center
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.lasers.push(laser);
  const audio = new Audio("smb_bowserfire.wav");
  audio.play();
  setPosition($element, x, y);
}

function updateLasers(dt, $container) {//updates the laser 
  const lasers = GAME_STATE.lasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y -= dt * LASER_MAX_SPEED;
    if (laser.y < 0) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);//returns a rectangle object 
    const r1 = laser.$element.getBoundingClientRect();
    const enemies = GAME_STATE.enemies;//loop enemies check if its dead
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j];
      if (enemy.isDead) continue;
      const r2 = enemy.$element.getBoundingClientRect();
      if (rectsIntersect(r1, r2)) {
        // Enemy was hit
        destroyEnemy($container, enemy);
        destroyLaser($container, laser);
        break;
      }
    }
  }
  GAME_STATE.lasers = GAME_STATE.lasers.filter(e => !e.isDead);
}

function destroyLaser($container, laser) {
  $container.removeChild(laser.$element);
  laser.isDead = true;
}

function createEnemy($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "SeekPng.com_bowser-png_347721.png";
  $element.className = "enemy";
  $container.appendChild($element);
  const enemy = {
    x,
    y,
    cooldown: rand(0.5, ENEMY_COOLDOWN),
    $element
  };
  GAME_STATE.enemies.push(enemy);
  setPosition($element, x, y);
}



function updateEnemies(dt, $container) {//this will rotate the enemies in a circular pattern 
  const dx = Math.sin(GAME_STATE.lastTime / 1000.0) * 50;
  const dy = Math.cos(GAME_STATE.lastTime / 1000.0) * 10;

  const enemies = GAME_STATE.enemies;
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const x = enemy.x + dx;
    const y = enemy.y + dy;
    setPosition(enemy.$element, x, y);//updates the DOM element
    enemy.cooldown -= dt;
    if (enemy.cooldown <= 0) {
      createEnemyLaser($container, x, y);
      enemy.cooldown = ENEMY_COOLDOWN;
    }
  }
  GAME_STATE.enemies = GAME_STATE.enemies.filter(e => !e.isDead);
}

function destroyEnemy($container, enemy) {
  $container.removeChild(enemy.$element);
  enemy.isDead = true;
}

function createEnemyLaser($container, x, y) {
  const $element = document.createElement("img");
  $element.src = "pngarea.com_fire-png-super-5142641 (1).png";
  $element.className = "enemy-laser";
  $container.appendChild($element);
  const laser = { x, y, $element };
  GAME_STATE.enemyLasers.push(laser);
  setPosition($element, x, y);
}


function updateEnemyLasers(dt, $container) {
  const lasers = GAME_STATE.enemyLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laser = lasers[i];
    laser.y += dt * LASER_MAX_SPEED;
    if (laser.y > GAME_HEIGHT) {
      destroyLaser($container, laser);
    }
    setPosition(laser.$element, laser.x, laser.y);
    const r1 = laser.$element.getBoundingClientRect();
    const player = document.querySelector(".player");
    const r2 = player.getBoundingClientRect();
    if (rectsIntersect(r1, r2)) {
      // Player was hit
      destroyPlayer($container, player);
      break;
    }
  }
  GAME_STATE.enemyLasers = GAME_STATE.enemyLasers.filter(e => !e.isDead);
}


function init() {//initializes all of the entities of the game, player and enemies
  const $container = document.querySelector(".game");//selects element we want to place our entities in 
  createPlayer($container);

  const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);//
  for (let j = 0; j < 3; j++) {
    const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
    for (let i = 0; i < ENEMIES_PER_ROW; i++) {
      const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
      createEnemy($container, x, y);
    }
  }
}

function playerHasWon() {
  return GAME_STATE.enemies.length === 0;
}

function update(e) {
  const currentTime = Date.now();
  const dt = (currentTime - GAME_STATE.lastTime) / 1000.0;//"delta time" to get the value in seconds

  if (GAME_STATE.gameOver) {
    document.querySelector(".game-over").style.display = "block";
    return;
  }

  if (playerHasWon()) {
    document.querySelector(".congratulations").style.display = "block";
    return;
  }
  

  const $container = document.querySelector(".game");
  updatePlayer(dt, $container);
  updateLasers(dt, $container);
  updateEnemies(dt, $container);
  updateEnemyLasers(dt, $container);

  GAME_STATE.lastTime = currentTime;//have to set the last time to the current time compare it to the time in between two frames not the time when the the game was started
  window.requestAnimationFrame(update);//it will update all individual entities, his runs every frame makes sure that all elements that need to move actually move
}

function onKeyDown(e) {//this saying what will take place as the key is being pressed
  if (e.keyCode === KEY_CODE_LEFT) {//function that checks for the given key 
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  } 
}

function onKeyUp(e) {//this is saying what will happen as you letting off of the key
  if (e.keyCode === KEY_CODE_LEFT) {//function that checks for the given key 
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}


init();
window.addEventListener("keydown", onKeyDown);//event listeners for key up and key down
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);//this is to kick off the animation 



