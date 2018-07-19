window.onload = () => {
//


///////////NOTES//////////////
//known issues//

// initial lives keeps being applied to the new player, doesn't go zero


//cannot remove from arrays now. filter does not work.
//need to fix detect interval as I cannot clear it currently
//player2 bulletdetect not working.

// if i change overflow from hidden, now and then an enemy will not be removed from the game.

//player1color is not being defined.

//if player spams bullets at high rate, cannot remove drone. this
//is because the detection rate is too slow and two bullets can enter the position of the drone
//and therefore function tries to remove the same drone twice. increase detection rate? tried, still happens

//when using 2nd player, charging, moving forward and moving down does not move down.
//setTimeout on waves needs to be removed on reset.
//need to fix charge- DONE

//p1 and p2 bullets can be refactored in same way as movement.*********
//need to add differentiation for bullets. i.e width and height. -DONE
//need to add a few more enemy types
//need to add boss.
//need player to fly in from left on respawn
//need intro and player select.
//need different bullets for each character (color) maybe a different max? Like extra wide, or narrow and high hitpoints
//set speed as variable/property for each type of enemy.
//set speed as property for layers

//////////////////////////////
  const gameHeight = 600;
  const gameWidth = 1000; //can use this in calculations below - still need to refactor.

  ///////////creategame////////////
  const body = document.getElementsByTagName('body')[0];
  const game = document.createElement('div');
  game.setAttribute('class','game');
  game.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
  body.appendChild(game);
  /////////////////////////////////////////

  //////////createIntro/////////

  const introScreen = document.createElement('div');
  introScreen.setAttribute('class','introScreen');
  introScreen.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
  game.appendChild(introScreen);

  const logo = document.createElement('img');
  logo.setAttribute('class','logo');
  logo.setAttribute('style', 'left: 302px; top: 100px;');
  logo.setAttribute('src', 'images/general-assembly-seeklogo.com.png');
  introScreen.appendChild(logo);

  const letterG = document.createElement('img');
  letterG.setAttribute('class','letter-g');
  letterG.setAttribute('style', 'left: 374px; top: 156px;');
  letterG.setAttribute('src', 'images/general-assembly-letter-G.png');
  introScreen.appendChild(letterG);

  const letterA = document.createElement('img');
  letterA.setAttribute('class','letter-a');
  letterA.setAttribute('style', 'left: 463px; top: 165px;');
  letterA.setAttribute('src', 'images/general-assembly-letter-A.png');
  introScreen.appendChild(letterA);

  const alactic = document.createElement('div');
  alactic.setAttribute('class','alactic');
  alactic.setAttribute('style', 'left: 270px; top: 100px;');
  alactic.textContent = 'alactic';
  introScreen.appendChild(alactic);

  const ssembly = document.createElement('div');
  ssembly.setAttribute('class','ssembly');
  ssembly.setAttribute('style', 'left: 350px; top: 330px;');
  ssembly.textContent = 'ssembly';
  introScreen.appendChild(ssembly);

  const aHole = document.createElement('div');
  aHole.setAttribute('class','a-hole');
  aHole.setAttribute('style', 'left: 287px; top: 362px; width: 36px; height: 36px;');
  introScreen.appendChild(aHole);

  setTimeout(function() {
    const startGameButton = document.createElement('div');
    startGameButton.setAttribute('class','start-game-button');
    startGameButton.setAttribute('style', 'left: 360px; top: 530px;');
    startGameButton.textContent = 'insert bit coin';
    introScreen.appendChild(startGameButton);

    setTimeout(function() {
      startGameButton.textContent = 'start game';
      startGameButton.addEventListener('click', endIntro);
      function endIntro() {
        aHole.classList.add('animate-a-hole');
        createSelectionScreen();
        setTimeout(function() {
          introScreen.parentNode.removeChild(introScreen);
        },1000);
      }
    }, 0); //2500
  }, 0); //4500
  /////////////////////////////////////////////////
  ////////////player selection/startgame///////////////
  let player2ModeActive = false; //will be included in intro so player can select.
  let player1Color = 1;
  let player2Color = 2;
  let char1Image;
  let player2Mode;
  let playerSelectScreen;
  let player1Heading;
  let player1Character;
  let player1SelectLeft;
  let player1SelectRight;
  let selectMode;
  let createStartMissionButton;
  let startMission;

  function createSelectionScreen() {
    playerSelectScreen = document.createElement('div');
    playerSelectScreen.setAttribute('class','playerSelectScreen');
    playerSelectScreen.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
    game.appendChild(playerSelectScreen);

    player1Heading = document.createElement('div');
    player1Heading.setAttribute('class','player1Heading');
    player1Heading.setAttribute('style', `width: 200px; height: 30px; top:${(gameHeight/2)-100}px; right:${gameWidth-300}px`);
    player1Heading.textContent = 'Player 1';
    playerSelectScreen.appendChild(player1Heading);

    player1Character = document.createElement('div');
    player1Character.setAttribute('class','player1Character');
    player1Character.setAttribute('style', `width: 200px; height: 100px; top:${(gameHeight/2)-50}px; right:${gameWidth-300}px;`);
    char1Image = document.createElement('img');
    char1Image.setAttribute('src', `images/ship${player1Color}.png`);
    char1Image.setAttribute('style', 'width: 160px; height: 55px');
    player1Character.appendChild(char1Image);
    playerSelectScreen.appendChild(player1Character);

    player1SelectLeft = document.createElement('div');
    player1SelectLeft .setAttribute('class','player1SelectLeft');
    player1SelectLeft .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; right:${gameWidth-100}px; background:   url(images/arrowleft.png) center/160%`);
    playerSelectScreen.appendChild(player1SelectLeft );

    player1SelectLeft.addEventListener('click', p1CycleLeft);

    player1SelectRight = document.createElement('div');
    player1SelectRight .setAttribute('class','player1SelectRight');
    player1SelectRight .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; right:${gameWidth-350}px; background:   url(images/arrowright.png) center/160%`);
    playerSelectScreen.appendChild(player1SelectRight );

    player1SelectRight.addEventListener('click', p1CycleRight);

    selectMode = document.createElement('div');
    selectMode.setAttribute('class','selectMode');
    selectMode .setAttribute('style', `width: 200px; height: 50px; top:${gameHeight/2-70}px; right:${gameWidth/2-100}px`);
    selectMode.textContent = 'Select mode';
    playerSelectScreen.appendChild(selectMode);

    player2Mode = document.createElement('div');
    player2Mode.setAttribute('class','player2Mode');
    player2Mode.setAttribute('style', `width: 200px; height: 50px; top:${gameHeight/2-25}px; right:${gameWidth/2-100}px`);
    player2Mode.textContent = '1 Player';
    playerSelectScreen.appendChild(player2Mode);

    player2Mode.addEventListener('click',player2Active);

    createStartMissionButton = document.createElement('div');
    createStartMissionButton.setAttribute('class','start-mission');
    createStartMissionButton.setAttribute('style', `width: 200px; height: 50px; top:${gameHeight-150}px; left:${gameWidth/2-100}px`);
    createStartMissionButton.textContent = 'start mission';
    playerSelectScreen.appendChild(createStartMissionButton);

    startMission = document.getElementsByClassName('start-mission')[0];
    startMission.addEventListener('click',startGame);

  }

  function p1CycleLeft() {
    if(player1Color-1 < 1) {
      player1Color=5;
      char1Image.setAttribute('src', `images/ship${player1Color}.png`);
    } else {
      player1Color-=1;
      char1Image.setAttribute('src', `images/ship${player1Color}.png`);
    }
  }

  function p1CycleRight() {
    if(player1Color+1 > 5) {
      player1Color=1;
      char1Image.setAttribute('src', `images/ship${player1Color}.png`);
    } else {
      player1Color+=1;
      char1Image.setAttribute('src', `images/ship${player1Color}.png`);
    }
  }

  function player2Active() {
    if(player2ModeActive) {
      player2ModeActive = false;
      removePlayer2Options();
    } else {
      player2ModeActive = true;
      showPlayer2Options();
    }
  }

  let player2Character;
  let player2SelectLeft;
  let player2SelectRight;
  let player2Heading;

  function showPlayer2Options() {
    player2Mode .textContent = '2 Players';
    player2Heading = document.createElement('div');
    player2Heading.setAttribute('class','player2Heading');
    player2Heading.setAttribute('style', `width: 200px; height: 30px; top:${(gameHeight/2)-100}px; left:${gameWidth-300}px`);
    player2Heading.textContent = 'Player 2';
    playerSelectScreen.appendChild(player2Heading);

    player2Character = document.createElement('div');
    player2Character.setAttribute('class','player2Character');
    player2Character.setAttribute('style', `width: 200px; height: 100px; top:${(gameHeight/2)-50}px; left:${gameWidth-300}px;`);
    playerSelectScreen.appendChild(player2Character);
    const char2Image = document.createElement('img');
    char2Image.setAttribute('src', `images/ship${player2Color}.png`);
    char2Image.setAttribute('style', 'width: 160px; height: 55px');
    player2Character.appendChild(char2Image);


    player2SelectLeft = document.createElement('div');
    player2SelectLeft .setAttribute('class','player2SelectLeft');
    player2SelectLeft .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; left:${gameWidth-350}px; background:   url(images/arrowleft.png) center/160%`);
    playerSelectScreen.appendChild(player2SelectLeft );

    player2SelectLeft.addEventListener('click', p2CycleLeft);

    function p2CycleLeft() {
      if(player2Color-1 < 1) {
        player2Color= 5;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      } else {
        player2Color-=1;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      }
    }

    player2SelectRight = document.createElement('div');
    player2SelectRight .setAttribute('class','player2SelectRight');
    player2SelectRight .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; left:${gameWidth-100}px; background:   url(images/arrowright.png) center/160%`);
    playerSelectScreen.appendChild(player2SelectRight );

    player2SelectRight.addEventListener('click', p2CycleRight);

    function p2CycleRight() {
      if(player2Color+1 > 5) {
        player2Color=1;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      } else {
        player2Color+=1;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      }
    }
  }

  function removePlayer2Options() {
    player2Mode .textContent = '1 Player';
    player2Character.parentNode.removeChild(player2Character);
    player2SelectLeft.parentNode.removeChild(player2SelectLeft);
    player2SelectRight.parentNode.removeChild(player2SelectRight);
    player2Heading.parentNode.removeChild(player2Heading);
  }
  ///createplayingField////////////

  let playingField;

  function startGame() {
    playerSelectScreen.parentNode.removeChild(playerSelectScreen);
    playingField = document.createElement('div');
    playingField.setAttribute('class','playingField');
    playingField.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
    game.appendChild(playingField);
    gameActive = true;
    playingField = document.getElementsByClassName('playingField')[0];
    if(!playingField) {
      playingField = document.createElement('div');
      game.setAttribute('class','playingField');
      game.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
      game.appendChild(playingField);
    }
    setTimeout(startWaves, 1000);
    p1ScoreCount = 0;
    p2ScoreCount = 0;
    createPlayer('player1');
    updateScore(getCurrentPlayer(1));
    if (player2ModeActive === true) {
      createPlayer('player2');
      updateScore(getCurrentPlayer(2));
    }
  }

  //   ////////////////Declarations///////////////////////


  const p1Score = document.getElementsByClassName('p1-score')[0];
  const p2Score = document.getElementsByClassName('p2-score')[0];



  let enemiesInPlay = [];

  let player1Lives = 3;
  let player2Lives = 3;
  let player1Record = [];
  let player2Record = [];
  let initialPlayerLives = 3;
  let defaultShotPower = 0; //This can be used to effect powerUps e.g 3 for a period of time;
  let gameActive = true;
  //These is declared as let as they are rassigned when they have been removed from DOM
  let player1;
  let player2;

  const players = {
    player1: {
      x: 0,
      y: 250,
      kills: 0,
      lifePoints: 1,
      width: 70,
      height: 25,
      invincible: true,
      moveSpeed: 2.5
    },

    player2: {
      x: 0,
      y: 280,
      kills: 0,
      lifePoints: 1,
      width: 70,
      height: 25,
      invincible: true,
      moveSpeed: 2.5
    }
  };

  const fireType = {
    lvl1: {
      hitPoints: 1,
      width: 40,
      height: 10,
      speed: 2.5
    },
    lvl2: {
      hitPoints: 2,
      width: 40,
      height: 10,
      speed: 2.5
    },
    lvl3: {
      hitPoints: 3,
      width: 40,
      height: 10,
      speed: 2.5
    },
    lvlMax: {
      hitPoints: 10,
      width: 40,
      height: 10,
      speed: 5
    }
  };

  // TODO:Must add more enemy waves and boss
  const enemyTypes = {
    type1: { x: 1000, y: -37.5, lifePoints: 1, score: 10, width: 50, height: 50},
    type2: { x: 1000, y: 575, lifePoints: 2, score: 25, width: 50, height: 50 },
    type3: { x: 1000, y: 300, lifePoints: 1, score: 10, width: 50, height: 50 },
    type4: { x: 350, y: -37.5, lifePoints: 1, score: 10, width: 50, height: 50 },
    type5: { x: 1000, y: 250, lifePoints: 200, score: 1000, width: 50, height: 50 }
  };
  /////////////////////////////////////////////////

  //   //////////////////////////player 1 & 2 controls//////////////////////
  const movementIntervals = [{}, {}];


  let ArrowLeft = false;
  let ArrowRight = false;
  let ArrowUp = false;
  let ArrowDown = false;
  let p1TriggerPulled = false;
  let w = false;
  let a = false;
  let s = false;
  let d = false;
  let p2TriggerPulled = false;

  function objectsCollide(obj1, obj2) {
    const obj1Left = obj1.xPos;
    const obj1Top = obj1.yPos;
    const obj1Right = obj1.xPos + obj1.width;
    const obj1Bottom = obj1.yPos + obj1.height;

    const obj2Left = obj2.xPos;
    const obj2Top = obj2.yPos;
    const obj2Right = obj2.xPos + obj2.width;
    const obj2Bottom = obj2.yPos + obj2.height;
    const collides =  (obj1Right > obj2Left) &&
      (obj1Left < obj2Right) &&
      (obj1Bottom > obj2Top) &&
      (obj1Top < obj2Bottom);
    return collides;
  }

  function objectCollidesWithAny(obj1, objArray) {
    const collidedObjects = [];
    for(let i = 0; i < objArray.length; i++) {
      if (objectsCollide(obj1, objArray[i])) {
        collidedObjects.push(objArray[i]);
      }
    }
    return collidedObjects;
  }

  window.addEventListener('keydown', e => {
    e.preventDefault();


    switch(e.key) {
      case 'ArrowLeft':
        if (ArrowLeft === false) {
          startMovement(0, 'left');
        }
        ArrowLeft = true;
        break;
      case 'ArrowRight':
        if (ArrowRight === false) {
          startMovement(0, 'right');
        }
        ArrowRight = true;
        break;
      case 'ArrowUp':
        if (ArrowUp === false) {
          startMovement(0, 'up');
        }
        ArrowUp = true;
        break;
      case 'ArrowDown':
        if (ArrowDown === false) {
          startMovement(0, 'down');
        }
        ArrowDown = true;
        break;
      case 'm':
        if (p1TriggerPulled === false) {
          getCurrentPlayer(1).chargeShot();
        }
        p1TriggerPulled = true;
        break;
      case 'w':
        if (w === false) {
          startMovement(1, 'up');
        }
        w = true;
        break;
      case 'a':
        if (a === false) {
          startMovement(1, 'left');
        }
        a = true;
        break;
      case 's':
        if (s === false) {
          startMovement(1, 'down');
        }
        s = true;
        break;
      case 'd':
        if (d === false) {
          startMovement(1, 'right');
        }
        d = true;
        break;
      case 'c':
        if (p2TriggerPulled === false) {
          getCurrentPlayer(2).chargeShot();
        }
        p2TriggerPulled = true;
        break;
    }
  });


  window.addEventListener('keyup', e => {
    switch(e.key) {
      case 'ArrowLeft':
        stopMovement(0, 'left');
        ArrowLeft = false;
        break;
      case 'ArrowRight':
        stopMovement(0, 'right');
        ArrowRight = false;
        break;
      case 'ArrowUp':
        stopMovement(0, 'up');
        ArrowUp = false;
        break;
      case 'ArrowDown':
        stopMovement(0, 'down');
        ArrowDown = false;
        break;
      case 'm':
        getCurrentPlayer(1).fireShot();
        p1TriggerPulled = false;
        break;
      case 'w':
        stopMovement(1, 'up');
        w = false;
        break;
      case 'a':
        stopMovement(1, 'left');
        a = false;
        break;
      case 's':
        stopMovement(1, 'down');
        s = false;
        break;
      case 'd':
        stopMovement(1, 'right');
        d = false;
        break;
      case 'c':
        getCurrentPlayer(2).fireShot();
        p2TriggerPulled = false;
        break;
    }
  });

  function startMovement(playerNumber, direction) {
    const interval = movementIntervals[playerNumber][direction];
    if (!interval) {
      movementIntervals[playerNumber][direction] = newInterval(() => movePlayer(playerNumber, direction), 10);
    }
  }

  function stopMovement(playerNumber, direction) {
    const interval = movementIntervals[playerNumber][direction];
    if (interval) {
      removeInterval(interval);
      movementIntervals[playerNumber][direction] =  null;
    }
  }

  // window.addEventListener('keydown', p1CheckKeyDown);
  function movePlayer(playerNumber, direction) {
    const player = getCurrentPlayer(playerNumber + 1);
    //check for if player exists(could be between lives)
    if(player.playerElement) {
      switch(direction) {
        case 'right':
          movePlayerRight(player);
          break;
        case 'left':
          movePlayerLeft(player);
          break;
        case 'up':
          movePlayerUp(player);
          break;
        case 'down':
          movePlayerDown(player);
          break;
      }
    }
  }

  function movePlayerRight(player) {
    if(player.xPos < 1000-player.width) {
      player.xPos+=player.moveSpeed;
      player.playerElement.style.left = player.xPos + 'px';
    }
  }

  function movePlayerLeft(player) {
    if(player.xPos > 0) {
      player.xPos-=player.moveSpeed;
      player.playerElement.style.left = player.xPos + 'px';
    }
  }

  function movePlayerUp(player) {
    if(player.yPos > 0) {
      player.yPos-=player.moveSpeed;
      player.playerElement.style.top = player.yPos + 'px';

    }
  }

  function movePlayerDown(player) {
    if(player.yPos < 600-player.height) {
      player.yPos+=player.moveSpeed;
      player.playerElement.style.top = player.yPos + 'px';
    }
  }


  //////////////////////score/////////////////////////
  function updateScore(player) {
    const scoreCount = player.score;
    //Dom Element
    const score = player.class === 'player1' ? p1Score : p2Score;
    const scoreCountString = scoreCount+'';
    const inputScore = '0'.repeat(6-scoreCountString.length) + scoreCountString;
    score.textContent = inputScore;
  }
  /////////////////////////////////////////////////////






  ///////////////////////Player Creation////////////////////
function getCurrentPlayer(playerNumber) {
  const playerRecord = playerNumber === 1 ? player1Record : player2Record;
  return playerRecord[playerRecord.length - 1];
}

  function createPlayer(playerClass) {
    const spawnedPlayer = new Player(playerClass);
    const playerRecord = playerClass === 'player1'? player1Record : player2Record;
    playerRecord.push(spawnedPlayer);
  }

  class Player {
    constructor(playerClass) {
      const player = players[playerClass];
      this.class = playerClass;
      this.xPos = player.x;
      this.yPos = player.y;
      this.lifePoints = player.lifePoints;
      this.invincible = player.invincible;
      this.width = player.width;
      this.height = player.height;
      this.bulletsInPlay = [];
      this.score = 0;
      this.charge = 0;
      this.shotPower = defaultShotPower;
      this.moveSpeed = player.moveSpeed;
      this.initialise();
    }

    initialise() {
      this.playerElement = document.createElement('div');
      this.playerElement.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px;`);
      this.playerElement.setAttribute('class', this.class);
      playingField.appendChild(this.playerElement);

      const playerImage = document.createElement('img');
      const playerColor = this.class === 'player1' ? player1Color : player2Color;
      playerImage.setAttribute('src', `images/ship${playerColor}.png`);
      playerImage.setAttribute('style',`width: ${this.width}px;`);
      this.playerElement.appendChild(playerImage);

      //for movement functions to target DOM element
      this.class === 'player1' ? player1 = this.playerElement : player2 = this.playerElement;

      this.playerHitBox();
      const _this = this;
      levelTimeouts.push(setTimeout(function() {
        _this.invincible = false;

      },2000));
    }

    playerHitBox() {
      const _this = this;
      const hit = newInterval(function() {
        _this.checkEnemyCollision();
        if (_this.lifePoints < 1) {
          if(_this.playerElement.parentNode) {
            _this.playerElement.parentNode.removeChild(_this.playerElement);
          }
          removeInterval(hit);
          if(_this.checkLives() > 0) {
            createPlayer(_this.class);
          } else {
            _this.gameOver();
          }
        }
      },50);
    }

    loseLife() {
      this.class === 'player1'? player1Lives-=1 : player2Lives-=1;
    }

    checkLives() {
      const playerLives = this.class === 'player1'? player1Lives : player2Lives;
      return playerLives;
    }

    checkEnemyCollision() {
      if (!this.invincible) {
        const enemiesHit = objectCollidesWithAny(this, enemiesInPlay);
        for(let i = 0; i < enemiesHit.length; i++) {
          this.handleEnemyHit(enemiesHit[i]);
        }
      }
    }

    handleEnemyHit() {
      this.lifePoints -= 1;
      //set position to null on death as enemys may continue to fly through and lower the score.
      this.xPos = null;
      this.yPos = null;

      this.score -= 100;
      if (this.score < 0) this.score = 0;

      this.loseLife();
      console.log(player1Lives)
      updateScore(this);
      console.log(this.checkLives());
    }

    chargeShot() {
      this.chargeIntervalId = newInterval(() => {
        if(this.shotPower.toFixed(2) <= 3) {
          this.shotPower +=0.1;
        } else if (this.shotPower.toFixed > 3) {
          removeInterval(this.chargeIntervalId);
        }
      },rateOfCharge);
    }

    fireShot() {
      removeInterval(this.chargeIntervalId);
      if (this.shotPower < 1) {
        this.shootByFireType('lvl1');
      } else if(this.shotPower < 2) {
        this.shootByFireType('lvl2');
      } else if (this.shotPower < 3) {
        this.shootByFireType('lvl3');
      } else if(this.shotPower >= 3){
        this.shootByFireType('lvlMax');
      }
      this.shotPower = defaultShotPower;
    }

    shootByFireType(level) {
      //sets initial position of fire at position pf player
      const xPos = this.xPos;
      const yPos = this.yPos + 15;

      new Bullet(xPos,yPos,level, this);
    }

    gameOver() {
      // TODO: What happens when a player dies?
    }
  }




  ///////////////////Bullet mechanics//////////////////////////////////////////

  let p1Charge;
  let p2Charge;
  let rateOfCharge = 50;

  class Bullet{
    constructor(xPos, yPos, level, player) {
      const bullet  = fireType[level];
      this.xPos = xPos;
      this.yPos = yPos;
      this.class = level;
      this.hitPoints = bullet.hitPoints;
      this.width = bullet.width;
      this.height = bullet.height;
      this.speed = bullet.speed;
      // Add this bullet to the player's bullet array
      this.player = player;
      this.player.bulletsInPlay.push(this);
      // Create the associated DOM element
      this.createDOMBullet();
    }

    createDOMBullet() {
      this.bulletElement = document.createElement('div');
      this.bulletElement.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px`);
      this.bulletElement.setAttribute('class', this.class);
      playingField.appendChild(this.bulletElement);
      this.travel();
    }

    removeFromGame() {
      //a check for if the element has been deleted for any reason before this function could do it.
      const domBullet = this.bulletElement;
      if(domBullet.parentNode) {
        domBullet.parentNode.removeChild(domBullet);
      }
      // Remove the interval ID from the global array
      removeInterval(this.travelInterval);
    }

    travel() {
      const _this = this;
      this.travelInterval = newInterval(function () {
        _this.checkCollision();
        const bulletStillInPlay = _this.xPos < 1000 && _this.hitPoints > 0;
        if(bulletStillInPlay) {
          _this.xPos += _this.speed;
          _this.bulletElement.style.left = _this.xPos + 'px';
        } else {
          // Remove the bullet from the game
          _this.removeFromGame();
        }
      },5);
      levelIntervals.push(this.travelInterval); //speed of bullet
    }

    checkCollision() {
      const enemiesHit = objectCollidesWithAny(this, enemiesInPlay);
      for(let i = 0; i < enemiesHit.length; i++) {
        this.handleEnemyHit(enemiesHit[i]);
      }
    }

    handleEnemyHit(enemy) {
      if(enemy) {
        const initialEnemyLifePoints = enemy.lifePoints;
        enemy.lifePoints -= this.hitPoints;
        this.hitPoints -= initialEnemyLifePoints;
        console.log(initialEnemyLifePoints);
        console.log(this.hitPoints);
        if (enemy.lifePoints <= 0) {
          this.player.score += enemy.score;
          updateScore(this.player);
        }
      }
    }
  }





  /////////////////////////////////////////////////////////////////////////////






  //////////////////////////////enemy creation//////////////////////////////////


  function createEnemiesOfClass(enemyClass, numberOfEnemies, delay) {
    levelTimeouts.push(setTimeout(function() {
      if(gameActive) {
        let i = numberOfEnemies;
        const releaseEnemy = newInterval(function() {
          if (gameActive === false) {
            removeInterval(releaseEnemy);
          } else if(i > 0) {
            i-=1;
            const spawnedEnemy = new Enemy(enemyClass);
            enemiesInPlay.push(spawnedEnemy);
          } else {
            removeInterval(releaseEnemy);
          }
        },700 //********** rate at which type 1 enemies spawn *************//
        );
      }
    },delay //************** delay for when type 2 initiates *****************//
    ));
  }

  class Enemy {
    constructor(enemyClass) {
      const enemy = enemyTypes[enemyClass];
      this.class = enemyClass;
      this.xPos = enemy.x;
      this.yPos = enemy.y;
      this.lifePoints = enemy.lifePoints;
      this.score = enemy.score;
      this.width = enemy.width;
      this.height = enemy.height;
      this.setUpdatePositionFunction();
      this.initialise();
    }

    setUpdatePositionFunction() {
      switch(this.class) {
        case 'type1':
          this.positionFunction = this.updatePosition1;
          break;
        case 'type2':
          this.positionFunction = this.updatePosition2;
          break;
        case 'type3':
          this.positionFunction = this.updatePosition3;
          break;
        case 'type4':
          this.positionFunction = this.updatePosition4;
          break;
        case 'type5':
          this.positionFunction = this.updatePosition5;
          break;
      }
    }

    initialise() {
      this.drone = document.createElement('div');
      this.drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
      this.drone.setAttribute('class', this.class);
      playingField.appendChild(this.drone);
      this.travel();
    }

    //***************//player1 collision//******************///
    //Errors show as there is a gap between removing node and creating new one and collision detection cannot find any player element. This if statement fixes that (undefined is false).


    isDead() {
      if(this.lifePoints <= 0) {
        enemiesInPlay = enemiesInPlay.filter(enemy => enemy !== this);
        this.removeDOMElement();
      }
    }

    removeDOMElement() {
      if(this.drone.parentNode) {
        this.drone.parentNode.removeChild(this.drone);
        this.drone = null;
      }
      removeInterval(this.intervalId);
    }

    travel() {
      const _this = this;
      this.intervalId = newInterval(function() {
        const positionWasUpdated = _this.positionFunction();
        _this.isDead();
        if (!positionWasUpdated) {
          if(playingField.children.length > 0) {
            // Remove from enemiesInPlay
            enemiesInPlay = enemiesInPlay.filter(enemy => enemy !== _this);
            _this.removeDOMElement();
            removeInterval(this.intervalId);
          }
        }
      },5); //has to be the same as the bullet check rate otherwise charge bullets will not work.
      levelIntervals.push(this.intervalId); //rate at which enemies move
    }

    positionDOMElement() {
      this.drone.style.left = this.xPos + 'px';
      this.drone.style.top = this.yPos + 'px';
    }

    updatePosition1() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 0.5;
        this.yPos += 0.5;
        this.positionDOMElement();
      } else if (this.xPos > this.width) {
        this.xPos -= 0.5;
        this.yPos -= 0.5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition2() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 0.5;
        this.yPos -= 0.5;
        this.positionDOMElement();
      } else if (this.xPos > this.width) {
        this.xPos -= 0.5;
        this.yPos += 0.5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition3() {
      //starting xPos is 1000
      if (this.xPos > this.width) {
        this.xPos -= 0.5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition4() {
      //starting xPos is 1000
      if (this.yPos < 300 - this.width) {
        this.yPos += 0.5;
        this.xPos += 0.1;
        this.positionDOMElement();
      } else if (this.yPos < 600) {
        this.yPos += 0.5;
        this.xPos -= 0.1;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition5() {
      //starting xPos is 1000
      if (this.lifePoints > 100 && this.xPos >= 0) {
        this.xPos -= 0.2;
        this.positionDOMElement();
      } else if (this.lifePoints > 50 && this.xPos <= 600 && this.xPos >= 0  ) {
        this.xPos +=0.5;
        this.positionDOMElement();
      } else if (this.lifePoints > 0 && this.xPos >= 0) {
        this.xPos -=0.5;
        this.positionDOMElement();
      } else if (this.lifePoints > 0 && this.xPos <= 600) {
        this.xPos +=0.5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

  }

  let levelTimeouts = [];

  //can setnumber of enemies as a variable at the top if needs be later.
  function startWaves() {

    //level creation
    // numberOfEnemies, delay

    // Wave 1
    // type5(1,0);
    createEnemiesOfClass('type1', 8, 0);
    createEnemiesOfClass('type2', 10,8000);
    createEnemiesOfClass('type3', 8,10000);
    createEnemiesOfClass('type2', 14,15000);
    createEnemiesOfClass('type4', 8,20000);
    createEnemiesOfClass('type2', 14,27000);
    createEnemiesOfClass('type1', 8, 35000);
    // Delay for each wave

    // Wave 2
    levelTimeouts.push(setTimeout(function() {
      createEnemiesOfClass('type2', 8,0);
      createEnemiesOfClass('type3', 10,8000);
      createEnemiesOfClass('type4', 8,10000);
      createEnemiesOfClass('type1', 14, 15000);
      createEnemiesOfClass('type3', 8,20000);
      createEnemiesOfClass('type2', 14,27000);
      createEnemiesOfClass('type3', 8,35000);
    }, 40000)); //Delay for each wave

  // wave3();
  }

  let levelIntervals = [];
  function newInterval(intervalFunction, timeout) {
    const intervalId = setInterval(intervalFunction, timeout);
    levelIntervals.push(intervalId);
    return intervalId;
  }
  function removeInterval(intervalId) {
    clearInterval(intervalId);
    levelIntervals = levelIntervals.filter(i => i !== intervalId);
  }
  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.


  //////////////////////////Start Game///////////////////////////////////////////


  const resetButton = document.getElementsByClassName('reset')[0];
  resetButton.addEventListener('click',resetGame);

  function resetGame() {
    gameActive = false;
    createSelectionScreen();
    enemiesInPlay = [];
    player1Record = [];
    player2Record = [];
    initialPlayerLives = 3;
    player1Lives = 3;
    player2Lives = 3;
    player2ModeActive = false;
    levelTimeouts.forEach(timeout => clearTimeout(timeout));
    levelTimeouts = [];
    levelIntervals.forEach(interval => removeInterval(interval));
    levelIntervals = [];
    if (playingField) {
      playingField.parentNode.removeChild(playingField);
    }
    //need to clear screen
    //empty the player arrays and enemy arrays(?);
  }
};
