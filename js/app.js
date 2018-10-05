window.onload = () => {
//


///////////NOTES//////////////

//p1 and p2 bullets can be refactored in same way as movement.*********
// TODO: Add boss
// TODO: Player to fly in from left on respawn
// TODO: need different bullets for each character (color) maybe a different max? Like extra wide, or narrow and high hitpoints


///////////// GAME SETUP /////////////////
  const gameHeight = 600;
  const gameWidth = 1000; //can use this in calculations below - still need to refactor.
  const backgroundMusic = document.getElementsByClassName('background-music')[0];
  const player1Sound = document.getElementsByClassName('player1sound')[0];
  const player2Sound = document.getElementsByClassName('player2sound')[0];
  const enemySound = document.getElementsByClassName('enemysound')[0];

  /////////// CREATE GAME ////////////
  const body = document.getElementsByTagName('body')[0];
  const game = document.createElement('div');
  game.setAttribute('class','game');
  game.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
  body.appendChild(game);

  const arcadeImg = document.createElement('img');
  arcadeImg.setAttribute('class','arcade-machine');
  arcadeImg.setAttribute('style', 'width:1365px; height:1290px;');
  arcadeImg.setAttribute('src', 'images/arcade.png');
  game.appendChild(arcadeImg);
  /////////////////////////////////////////

  //////////CREATE INTRO SCREEN/////////
  let introScreen;

  introScreen = document.createElement('div');
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

  //////// INTRO ANIMATION SETUP
  let startGameButton;
  let canPressStart = false;

  setTimeout(function() {
    startGameButton = document.createElement('div');
    startGameButton.setAttribute('class','start-game-button');
    startGameButton.setAttribute('style', 'left: 360px; top: 530px;');
    startGameButton.textContent = 'insert bit coin';
    introScreen.appendChild(startGameButton);

    setTimeout(function() {
      startGameButton.textContent = 'start game';
      startGameButton.addEventListener('click', endIntro);
      canPressStart = true;
    }, 2500); //2500
  }, 4500); //4500

  function endIntro() {
    if (introScreen && canPressStart) {
      canPressStart = false;
      startGameButton.removeEventListener('click', endIntro);
      backgroundMusic.setAttribute('src', './sounds/Daft Punk  The Glitch Mob - Tron Legacy Reconfigured.mp3');
      backgroundMusic.play();
      backgroundMusic.loop = true;
      aHole.classList.add('animate-a-hole');
      setTimeout(function() {
        startGameButton.addEventListener('click', endIntro);
        createSelectionScreen();
        introScreen.parentNode.removeChild(introScreen);
        introScreen = null;
      }, 1000);
    }
  }
  /////////////////////////////////////////////////

  ////////////CREATE PLAYER SELECTION/START GAME SCREEN///////////////

  let playerSelectScreen;
  let selectMode;
  let createStartMissionButton;
  let startMission;

  let player1Color = 1;
  let player2Color = 2;
  let char1Image;
  let player1Heading;
  let player1Character;
  let player1SelectLeft;
  let player1SelectRight;
  let player1Instructions;

  let player2ModeActive = false; //This can be changed in player select
  let player2Mode;

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

    player1Instructions = document.createElement('div');
    player1Instructions.setAttribute('class','player1Instructions');
    player1Instructions.setAttribute('style', 'width: 300px; height: 100px;');
    player1Instructions.innerHTML = '<p>WASD keys to move</p> <p>c to shoot/hold to charge shot</p>';
    playerSelectScreen.appendChild(player1Instructions);

    player1SelectLeft = document.createElement('div');
    player1SelectLeft.setAttribute('class','player1SelectLeft');
    player1SelectLeft.setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; right:${gameWidth-100}px; background:   url(images/arrowleft.png) center/160%`);
    playerSelectScreen.appendChild(player1SelectLeft );

    player1SelectLeft.addEventListener('click', p1CycleLeft);
    player1SelectLeft.addEventListener('keydown', p1CycleLeft);

    player1SelectRight = document.createElement('div');
    player1SelectRight.setAttribute('class','player1SelectRight');
    player1SelectRight.setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; right:${gameWidth-350}px; background:   url(images/arrowright.png) center/160%`);
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
    if (playerSelectScreen) {
      if(player1Color-1 < 1) {
        player1Color=5;
        char1Image.setAttribute('src', `images/ship${player1Color}.png`);
      } else {
        player1Color-=1;
        char1Image.setAttribute('src', `images/ship${player1Color}.png`);
      }
    }
  }

  function p1CycleRight() {
    if (playerSelectScreen) {
      if(player1Color+1 > 5) {
        player1Color=1;
        char1Image.setAttribute('src', `images/ship${player1Color}.png`);
      } else {
        player1Color+=1;
        char1Image.setAttribute('src', `images/ship${player1Color}.png`);
      }
    }
  }

  ////// PLAYER 2 MODE ///////

  function player2Active() {
    if (playerSelectScreen) {
      if(player2ModeActive) {
        player2ModeActive = false;
        removePlayer2Options();
      } else {
        player2ModeActive = true;
        showPlayer2Options();
      }
    }
  }

  let player2Character;
  let player2SelectLeft;
  let player2SelectRight;
  let player2Heading;
  let player2Instructions;
  let char2Image;

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
    char2Image = document.createElement('img');
    char2Image.setAttribute('src', `images/ship${player2Color}.png`);
    char2Image.setAttribute('style', 'width: 160px; height: 55px');
    player2Character.appendChild(char2Image);

    player2Instructions = document.createElement('div');
    player2Instructions.setAttribute('class','player2Instructions');
    player2Instructions.setAttribute('style', 'width: 300px; height: 100px;');
    player2Instructions.innerHTML = '<p>Arrow keys to move</p> <p>m to shoot/hold to charge shot</p>';
    playerSelectScreen.appendChild(player2Instructions);


    player2SelectLeft = document.createElement('div');
    player2SelectLeft .setAttribute('class','player2SelectLeft');
    player2SelectLeft .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; left:${gameWidth-350}px; background:   url(images/arrowleft.png) center/160%`);
    playerSelectScreen.appendChild(player2SelectLeft );

    player2SelectLeft.addEventListener('click', p2CycleLeft);

    player2SelectRight = document.createElement('div');
    player2SelectRight .setAttribute('class','player2SelectRight');
    player2SelectRight .setAttribute('style', `width: 40px; height: 50px; top:${gameHeight/2-25}px; left:${gameWidth-100}px; background:   url(images/arrowright.png) center/160%`);
    playerSelectScreen.appendChild(player2SelectRight );

    player2SelectRight.addEventListener('click', p2CycleRight);
  }

  function p2CycleLeft() {
    if (playerSelectScreen && player2ModeActive) {
      if(player2Color-1 < 1) {
        player2Color= 5;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      } else {
        player2Color-=1;
        char2Image.setAttribute('src', `images/ship${player2Color}.png`);
      }
    }
  }

  function p2CycleRight() {
    if (playerSelectScreen && player2ModeActive) {
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

  /////////////////////////   CREATE PLAYING FIELD   ///////////////////////

  // NOTES

  // Elements are inserted and removed as the game starts and resets

  let playingField;


  let resetButton;
  let gameOverScreen;
  let planet1;
  let planet2;
  let foreground;

  let livesPanel1;
  let livesPanel2;
  let p1Lives;
  let p2Lives;

  const lifeLossPenalty = 1000;
  let initialPlayerLives = 3;
  let player1Lives = initialPlayerLives;
  let player2Lives = initialPlayerLives;

  let scorePanel1;
  let scorePanel2;
  let p1Score;
  let p2Score;
  let player1Record = [];
  let player2Record = [];

  let p1ChargeBarStat;
  let p2ChargeBarStat;
  let p1ChargeBarContainer;
  let p2ChargeBarContainer;
  let p1ChargeBarFill;
  let p2ChargeBarFill;
  let p1ChargeBarElement;
  let p2ChargeBarElement;


  function startGame() {
    // INITIATE GAME HUD
    if (playerSelectScreen) {
      playerSelectScreen.parentNode.removeChild(playerSelectScreen);
      playerSelectScreen = null;
      playingField = document.createElement('div');
      playingField.setAttribute('class','playingField');
      playingField.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px; background: url(./images/spacebackground.png) center/cover`);
      game.appendChild(playingField);
      removeScorePanels();
      insertScorePanels();
      insertResetButton();
      removeLifePanels();
      insertLifePanels();
      removeChargeBars();
      insertChargeBars();
      gameActive = true;

      //// CREATE BACKGROUND AND FOREGROUND /////
      planet1 = document.createElement('img');
      planet1.setAttribute('class','planet1');
      planet1.setAttribute('src', './images/planet1.png');
      playingField.appendChild(planet1);


      planet2 = document.createElement('img');
      planet2.setAttribute('class','planet2');
      planet2.setAttribute('src', './images/planet2.png');
      playingField.appendChild(planet2);

      foreground = document.createElement('img');
      foreground.setAttribute('class','foreground');
      foreground.setAttribute('src', './images/spaceforeground.png');
      playingField.appendChild(foreground);

      //// START ENEMY WAVES AND SPAWN PLAYER(S)
      setTimeout(startWave, 1000);
      createPlayer('player1');
      updateScore(getCurrentPlayer(1));
      if (player2ModeActive === true) {
        createPlayer('player2');
        updateScore(getCurrentPlayer(2));
      }
    }

  }

  function insertScorePanels() {
    scorePanel1 = document.createElement('div');
    scorePanel1.setAttribute('class', 'score-panel1');
    scorePanel1.setAttribute('style', 'top: 10px; left: 30px');
    scorePanel1.innerHTML = '<p class="p1-score-text">player 1 score: <span class="p1-score"></span></p>';
    game.appendChild(scorePanel1);
    p1Score = document.getElementsByClassName('p1-score')[0];

    scorePanel2 = document.createElement('div');
    scorePanel2.setAttribute('class', 'score-panel2');
    scorePanel2.setAttribute('style', 'top: 10px; right: 30px');
    scorePanel2.innerHTML = '<p class="p1-score-text">player 2 score: <span class="p2-score"></span></p>';
    game.appendChild(scorePanel2);
    p2Score = document.getElementsByClassName('p2-score')[0];
  }

  function removeScorePanels() {
    if(scorePanel1 && scorePanel2 && scorePanel1.parentNode && scorePanel2.parentNode) {
      scorePanel1.parentNode.removeChild(scorePanel1);
      scorePanel2.parentNode.removeChild(scorePanel2);
    }
  }

  function insertResetButton() {
    resetButton = document.createElement('div');
    resetButton.setAttribute('class', 'reset');
    resetButton.setAttribute('style', 'bottom: 10px; right: 30px');
    playingField.appendChild(resetButton);
    resetButton.addEventListener('click',resetGame);
    resetButton.textContent = 'reset';
  }

  function insertChargeBars() {
    p1ChargeBarContainer = document.createElement('div');
    p1ChargeBarContainer.setAttribute('class', 'chargeBarContainer');
    p1ChargeBarContainer.setAttribute('style', 'top: 43px; left: 155px');
    playingField.appendChild(p1ChargeBarContainer);

    p1ChargeBarFill = document.createElement('div');
    p1ChargeBarFill.setAttribute('class', 'p1ChargeBar');
    p1ChargeBarContainer.appendChild(p1ChargeBarFill);

    p1ChargeBarElement = document.getElementsByClassName('p1ChargeBar')[0];
    if (player2ModeActive) {
      p2ChargeBarContainer = document.createElement('div');
      p2ChargeBarContainer.setAttribute('class', 'chargeBarContainer');
      p2ChargeBarContainer.setAttribute('style', 'top: 43px; right: 43px');
      playingField.appendChild(p2ChargeBarContainer);

      p2ChargeBarFill = document.createElement('div');
      p2ChargeBarFill.setAttribute('class', 'p2ChargeBar');
      p2ChargeBarContainer.appendChild(p2ChargeBarFill);

      p2ChargeBarElement = document.getElementsByClassName('p2ChargeBar')[0];
    }
  }

  function removeChargeBars() {
    if(p1ChargeBarContainer && p1ChargeBarContainer.parentNode) {
      p1ChargeBarContainer.parentNode.removeChild(p1ChargeBarContainer);
    }
    if(p2ChargeBarContainer && p2ChargeBarContainer.parentNode) {
      p2ChargeBarContainer.parentNode.removeChild(p2ChargeBarContainer);
    }
  }

  function insertLifePanels() {
    livesPanel1 = document.createElement('div');
    livesPanel1.setAttribute('class', 'lives-panel1');
    livesPanel1.setAttribute('style', 'top: 30px; left: 28px');
    livesPanel1.innerHTML = `<p class="p1-lives-text">Lives: <span class="p1-lives">${player1Lives}</span></p>`;
    game.appendChild(livesPanel1);
    p1Lives = document.getElementsByClassName('p1-lives')[0];


    if (player2ModeActive) {
      livesPanel2 = document.createElement('div');
      livesPanel2.setAttribute('class', 'lives-panel2');
      livesPanel2.setAttribute('style', 'top: 30px; right: 240px');
      livesPanel2.innerHTML = `<p class="p2-lives-text">Lives: <span class="p2-lives">${player2Lives}</span></p>`;
      game.appendChild(livesPanel2);
      p2Lives = document.getElementsByClassName('p2-lives')[0];

    }
  }

  function removeLifePanels() {
    if(livesPanel1 && livesPanel1.parentNode) {
      livesPanel1.parentNode.removeChild(livesPanel1);
    }
    if(livesPanel2 && livesPanel2.parentNode) {
      livesPanel2.parentNode.removeChild(livesPanel2);
    }
  }

  // Updates lives left
  function updateLifePanels(player) {
    if (player.class === 'player1') {

      p1Lives.textContent = player1Lives;
    } else p2Lives.textContent = player2Lives;
  }

  function createGameOverScreen(phrase) {
    gameOverScreen = document.createElement('div');
    gameOverScreen.setAttribute('style', `width: ${gameWidth}px; height:${gameHeight}px;`);
    gameOverScreen.setAttribute('class', 'gameover');
    gameOverScreen.innerHTML = `<p class="gameover-text">${phrase}</p>`;
    game.appendChild(gameOverScreen);
  }


  /////////////////// PLAYER AND ENEMY STATS ////////////////////

  // This keeps tabs on the enemies in play so that they can be positioned
  // and removed from play
  let enemiesInPlay = [];

  // TODO: Add powerups that effect shot power
  let defaultShotPower = 0; //This can be used to effect powerUps e.g 3 for a period of time; Keep as let
  let gameActive = false;
  //These is declared as let as they are rassigned when they have been removed from DOM
  let player1;
  let player2;

  ///// PLAYER CONFIG /////

  const players = {
    player1: {
      x: 10,
      y: 250,
      kills: 0,
      lifePoints: 1,
      width: 70,
      height: 25,
      invincible: true,
      moveSpeed: 2.5
    },

    player2: {
      x: 10,
      y: 280,
      kills: 0,
      lifePoints: 1,
      width: 70,
      height: 25,
      invincible: true,
      moveSpeed: 2.5
    }
  };

  ////// BULLET CONFIG ////////
  const fireType = {
    lvl1: {
      hitPoints: 1,
      width: 15,
      height: 15,
      speed: 2.5,
      img: 'images/bulletlvl1.png',
      imgWidth: 20,
      imgHeight: 15
    },
    lvl2: {
      hitPoints: 2,
      width: 20,
      height: 20,
      speed: 2.5,
      img: 'images/bulletlvl2.png',
      imgWidth: 40,
      imgHeight: 20
    },
    lvl3: {
      hitPoints: 3,
      width: 50,
      height: 20,
      speed: 2.5,
      img: 'images/bulletlvl3.png',
      imgWidth: 70,
      imgHeight: 20
    },
    lvlMax: {
      hitPoints: 10,
      width: 70,
      height: 20,
      speed: 5,
      img: 'images/bulletlvlMax.png',
      imgWidth: 90,
      imgHeight: 20
    }
  };

  ////// ENEMY CONFIG ///////
  // TODO:Must add more enemy waves and boss
  const enemyTypes = {
    type1: {
      x: 1000,
      y: -37.5,
      lifePoints: 6,
      score: 100,
      width: 100,
      height: 100,
      img: 'images/enemy-greenrobot.png',
      imgWidth: 100,
      imgHeight: 100
    },

    type2: {
      x: 1000,
      y: 575,
      lifePoints: 10,
      score: 400,
      width: 100,
      height: 100,
      img: 'images/enemy-pinkrobot.png',
      imgWidth: 100,
      imgHeight: 100
    },

    type3: {
      x: 1000,
      y: 100,
      lifePoints: 1,
      score: 10,
      width: 50,
      height: 50,
      img: 'images/enemy-redship.png',
      imgWidth: 50,
      imgHeight: 50
    },

    type4: {
      x: 1000,
      y: 400,
      lifePoints: 1,
      score: 10,
      width: 50,
      height: 50,
      img: 'images/enemy-redship.png',
      imgWidth: 50,
      imgHeight: 50
    },

    type5: {
      x: 1000,
      y: 250,
      lifePoints: 3,
      score: 50,
      width: 50,
      height: 50,
      img: 'images/enemy-purpleship.png',
      imgWidth: 50,
      imgHeight: 50
    },

    type6: {
      x: 1000,
      y: 250,
      lifePoints: 3,
      score: 35,
      width: 50,
      height: 50,
      img: 'images/enemy-purpleship.png',
      imgWidth: 50,
      imgHeight: 50
    },

    type7: {
      x: 350,
      y: -37.5,
      lifePoints: 1,
      score: 10,
      width: 50,
      height: 50,
      img: 'images/enemy-brownship.png',
      imgWidth: 50,
      imgHeight: 50
    },

    //need to finish - BOSS
    type8: {
      x: 1000,
      y: 250,
      lifePoints: 200,
      score: 1000,
      width: 50,
      height: 50,
      img: '',
      imgWidth: 50,
      imgHeight: 50
    }
  };
  /////////////////////////////////////////////////

  ////////////////////////// COLLISION DETECTION //////////////////////////////

  ///// COLLISION DETECTION FUNCTION
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

  //// CHECKS THE COLLISION POTENTIAL FOR EVERY ELEMENT IN PLAY (objArray)
  function objectCollidesWithAny(obj1, objArray) {
    const collidedObjects = [];
    for(let i = 0; i < objArray.length; i++) {
      if (objectsCollide(obj1, objArray[i])) {
        collidedObjects.push(objArray[i]);
      }
    }
    return collidedObjects;
  }

  ////////////////////  PLAYER 1 & 2 CONTROLS AND MOVEMENT //////////////////

  //BOOLEANS NECESSARY TO PREVENT DUPLICATE SETINTERVALS
  let ArrowLeft = false;
  let ArrowRight = false;
  let ArrowUp = false;
  let ArrowDown = false;
  let w = false;
  let a = false;
  let s = false;
  let d = false;
  let p1TriggerPulled = false;
  let p2TriggerPulled = false;

  //Had to remap p1Trigger from C to V as keyboard doesn't allow keypress of
  //both C, D and any others together - because they're the same column maybe?

  //ALIVE SWITCH PREVENTS MOVEMENT ERRORS DURING DEATH AND CONTINUED CHARGING

  // KEY DOWN CONTROLS - INITIATES INTERVALS
  body.addEventListener('keydown', e => {
    e.preventDefault();
    switch(e.key) {
      case ' ':
        startGame();
        endIntro();
        break;
      case 'r':
        resetGame();
        break;
      case 'a':
        if (a === false) {
          startMovement(0, 'left');
          p1CycleLeft();
        }
        a = true;
        break;
      case 'd':
        if (d === false) {
          startMovement(0, 'right');
          p1CycleRight();
        }
        d = true;
        break;
      case 'w':
        if (w === false) {
          startMovement(0, 'up');
        }
        w = true;
        break;
      case 's':
        if (s === false) {
          startMovement(0, 'down');
        }
        s = true;
        break;
      case 'v':
        if(getCurrentPlayer(1) && getCurrentPlayer(1).alive === true) {
          if (p1TriggerPulled === false) {
            getCurrentPlayer(1).chargeShot();
          }
          p1TriggerPulled = true;
        }
        break;
      case 'Shift':
        player2Active();
        break;
      case 'ArrowLeft':
        if (ArrowLeft === false) {
          startMovement(1, 'left');
          p2CycleLeft();
        }
        ArrowLeft = true;
        break;
      case 'ArrowRight':
        if (ArrowRight === false) {
          startMovement(1, 'right');
          p2CycleRight();
        }
        ArrowRight = true;
        break;
      case 'ArrowUp':
        if (ArrowUp === false) {
          startMovement(1, 'up');
        }
        ArrowUp = true;
        break;
      case 'ArrowDown':
        if (ArrowDown === false) {
          startMovement(1, 'down');
        }
        ArrowDown = true;
        break;
      case 'm':
        if(getCurrentPlayer(2) && getCurrentPlayer(2).alive === true) {
          if (p2TriggerPulled === false) {
            getCurrentPlayer(2).chargeShot();
          }
          p2TriggerPulled = true;
        }
        break;
    }
  });

  // KEY UP CONTROLS - REMOVES INTERVALS
  body.addEventListener('keyup', e => {
    switch(e.key) {
      case 'a':
        stopMovement(0, 'left');
        a = false;
        break;

      case 'd':
        stopMovement(0, 'right');
        d = false;
        break;
      case 'w':
        stopMovement(0, 'up');
        w = false;
        break;
      case 's':
        stopMovement(0, 'down');
        s = false;
        break;
      case 'v':
        if(getCurrentPlayer(1) && getCurrentPlayer(1).alive === true) {
          getCurrentPlayer(1).fireShot();
          p1TriggerPulled = false;
        }
        break;
      case 'ArrowLeft':
        stopMovement(1, 'left');
        ArrowLeft = false;
        break;
      case 'ArrowRight':
        stopMovement(1, 'right');
        ArrowRight = false;
        break;
      case 'ArrowUp':
        stopMovement(1, 'up');
        ArrowUp = false;
        break;
      case 'ArrowDown':
        stopMovement(1, 'down');
        ArrowDown = false;
        break;
      case 'm':
        if(getCurrentPlayer(2) && getCurrentPlayer(2).alive === true) {
          getCurrentPlayer(2).fireShot();
          p2TriggerPulled = false;
        }
        break;

    }
  });

  // MOVEMENT FUNCTIONALITY

  // {} FOR EACH PLAYER
  const movementIntervals = [{}, {}];

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

  // SWITCH DETERMINES THE FUNCTION ACCORDING TO DIRECTION
  function movePlayer(playerNumber, direction) {
    const player = getCurrentPlayer(playerNumber + 1);
    //check for if player exists(could be between lives)
    if(player && player.playerElement) {
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

  // DIRECTION FUNCTIONALITY
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

  //////////////////////////////////  SCORE    /////////////////////////////////
  function updateScore(player) {
    const scoreCount = player.score;
    //Dom Element
    const score = player.class === 'player1' ? p1Score : p2Score;
    const scoreCountString = scoreCount+'';
    const inputScore = '0'.repeat(6-scoreCountString.length) + scoreCountString;
    score.textContent = inputScore;
  }


  ////////////////////////////// PLAYER CREATION ///////////////////////////////
  function getCurrentPlayer(playerNumber) {
    const playerRecord = playerNumber === 1 ? player1Record : player2Record;
    return playerRecord[playerRecord.length - 1];
  }

  // Create a player object. Optionally, pass the previous player
  // (after the previous player has died) so the score can be maintained
  // between lives
  function createPlayer(playerClass, previousPlayer) {
    const spawnedPlayer = new Player(playerClass);
    if (previousPlayer) {
      // Maintain score between lives
      spawnedPlayer.score = previousPlayer.score;
    }
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
      this.alive = true;
      this.initialise();
    }

    //Brings player into existence and effects invincibility;
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

      this.playerHitBox();
      const _this = this;
      levelTimeouts.push(setTimeout(function() {
        _this.invincible = false;

      },2000));
    }

    //Attaches the collision detection to the player and handles death
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
            createPlayer(_this.class, _this);
          } else if (player2ModeActive === false) {
            gameOver('Game over');
          } else if (player1Lives === 0 && player2Lives === 0) {
            gameOver('Game over');
          }
        }
      },5);
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
      //DEATH AUDIO
      this.identifySoundElement().setAttribute('src', 'sounds/enemydestroy.mp3');
      this.identifySoundElement().play();
      this.lifePoints -= 1;
      this.alive = false;
      //set position to null on death as enemys may continue to fly through and lower the score.
      this.xPos = null;
      this.yPos = null;
      // Handles score on life loss;
      this.score -= lifeLossPenalty;
      if (this.score < 0) this.score = 0;
      this.loseLife();
      updateScore(this);
      updateLifePanels(this);
      removeInterval(this.chargeIntervalId);
    }

    loseLife() {
      this.class === 'player1'? player1Lives-=1 : player2Lives-=1;
    }

    checkLives() {
      const playerLives = this.class === 'player1'? player1Lives : player2Lives;
      return playerLives;
    }

    identifySoundElement() {
      if(this.class === 'player1') {
        return player1Sound;
      } else {
        return player2Sound;
      }
    }


    chargeShot() {
      //CHARGE SHOT AUDIO
      this.identifySoundElement().setAttribute('src', 'sounds/chargesound.mp3');
      this.identifySoundElement().play();
      this.identifySoundElement().loop = true;
      this.identifySoundElement().volume = 0.5;

      this.chargeIntervalId = newInterval(() => {
        if (this.class === 'player1') {
          p1ChargeBarStat = this.shotPower.toFixed(2);
          calcChargeBarWidth(this.class);
        } else {
          p2ChargeBarStat = this.shotPower.toFixed(2);
          calcChargeBarWidth(this.class);
        }

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
      // Reset the shotPower and charge bar;
      this.shotPower = defaultShotPower;
      if(this.class === 'player1') {
        p1ChargeBarStat = 0;
        calcChargeBarWidth(this.class);
      } else {
        p2ChargeBarStat = 0;
        calcChargeBarWidth(this.class);
      }
    }

    shootByFireType(level) {
      this.identifySoundElement().setAttribute('src', 'sounds/shootlvl1.mp3');
      this.identifySoundElement().play();
      this.identifySoundElement().loop = false;
      //sets initial position of fire at position pf player
      const xPos = this.xPos + 35;
      const yPos = this.yPos + 12;

      new Bullet(xPos,yPos,level, this);
    }


  }

  function calcChargeBarWidth(player) {
    if (player === 'player1') {
      const newP1Width = (p1ChargeBarStat/3.10)*100;
      p1ChargeBarElement.setAttribute('style', `width:${newP1Width}%`);
    } else {
      const newP2Width = (p2ChargeBarStat/3.10)*100;
      p2ChargeBarElement.setAttribute('style', `width:${newP2Width}%`);
    }
  }

  //////////////////////////// BULLET MECHANICS //////////////////////////////

  let p1Charge;
  let p2Charge;
  let rateOfCharge = 50; //(milliseconds)

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
      this.img = bullet.img;
      this.imgWidth = bullet.imgWidth;
      this.imgHeight = bullet.imgHeight;
      // Add this bullet to the player's bullet array
      this.player = player;
      this.player.bulletsInPlay.push(this);
      // Create the associated DOM element
      this.createDOMBullet();
    }

    // Brings bullet into existence;
    createDOMBullet() {
      this.bulletElement = document.createElement('div');
      this.bulletElement.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px`);
      this.bulletElement.setAttribute('class', this.class);
      playingField.appendChild(this.bulletElement);

      this.bulletImg = document.createElement('img');
      this.bulletImg.setAttribute('style',`width: ${this.imgWidth}px; height: ${this.imgHeight}px`);
      this.bulletImg.setAttribute('src',this.img);
      this.bulletElement.appendChild(this.bulletImg);
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
        //Checks if still on screen or has any hit points left, if no, remove
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
        //Life points before hit
        const initialEnemyLifePoints = enemy.lifePoints;

        //Life points(enemy) and hit points(bullet) after hit
        enemy.lifePoints -= this.hitPoints;
        this.hitPoints -= initialEnemyLifePoints;

        if (enemy.lifePoints <= 0) {
          //Add to score on enemy kill
          this.player.score += enemy.score;
          updateScore(this.player);
        }
      }
    }
  }

  /////////////////////////// ENEMY CREATION ////////////////////////////////

  const spawnRate = 1000; // (milliseconds);
  let waveNumber = 1; //Starting wave number;

  //SPAWNS ENEMIES - SEE LEVEL CREATION FOR EXAMPLE ON HOW TO USE
  function createEnemiesOfType(enemyType, numberOfEnemies, delay, startNextWave, waveSelect) {
    levelTimeouts.push(setTimeout(function() {
      if(gameActive) {
        let i = numberOfEnemies;
        const releaseEnemy = newInterval(function() {
          if (gameActive === false) {
            removeInterval(releaseEnemy);
          } else if(i > 0) {
            i-=1;
            const spawnedEnemy = new Enemy(enemyType);
            enemiesInPlay.push(spawnedEnemy);
          } else {
            removeInterval(releaseEnemy);
            //Optional, can be used to release next wave or end game;
            if (startNextWave) {
              waveNumber = waveSelect;
              startWave();
            }
          }
        },spawnRate
        );
      }
    },delay
    ));
  }

  class Enemy {
    constructor(type) {
      const enemy = enemyTypes[type];
      this.class = type;
      this.xPos = enemy.x;
      this.yPos = enemy.y;
      this.lifePoints = enemy.lifePoints;
      this.score = enemy.score;
      this.width = enemy.width;
      this.height = enemy.height;
      this.img = enemy.img;
      this.imgWidth = enemy.imgWidth,
      this.imgHeight = enemy.imgHeight;
      this.setUpdatePositionFunction();
      this.initialise();
    }

    //UPDATE POSITION FUNCTIONS VARY BY ENEMY TYPE - THIS ASSIGNS THE CORRECT
    //ONE TO 'THIS'
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
        case 'type6':
          this.positionFunction = this.updatePosition6;
          break;
        case 'type7':
          this.positionFunction = this.updatePosition7;
          break;
        case 'type8':
          this.positionFunction = this.updatePosition8;
          break;
      }
    }

    //Brings enemy into existence and initiates travel functionality
    initialise() {
      this.enemyElement = document.createElement('div');
      this.enemyElement.setAttribute('style', `top:${this.yPos}px; left:${this.xPos}px; width:${this.width}px; height:${this.height}px;`);
      this.enemyElement.setAttribute('class', this.class);
      playingField.appendChild(this.enemyElement);

      this.enemySprite = document.createElement('img');
      this.enemySprite.setAttribute('style',`width:${this.imgWidth}px; height:${this.imgHeight}px;`);
      this.enemySprite.setAttribute('src', `${this.img}`);
      this.enemyElement.appendChild(this.enemySprite);
      this.travel();
    }

    // Handles travel, checks if enemy dead and if enemy has gone off screen,
    // removes from DOM and removes enemy object if so
    travel() {
      const _this = this;
      this.intervalId = newInterval(function() {
        const positionWasUpdated = _this.positionFunction();
        _this.removeIfDead();
        if (!positionWasUpdated) {
          if(playingField.children.length > 0) {
            // Remove from enemiesInPlay
            enemiesInPlay = enemiesInPlay.filter(enemy => enemy !== _this);
            _this.removeDOMElement();
            removeInterval(this.intervalId);
          }
        }
      },5); //has to be the same as the bullet check rate otherwise charged bullets will not work as intended.
      levelIntervals.push(this.intervalId); //rate at which enemies move
    }

    removeIfDead() {
      if(this.lifePoints <= 0) {
        enemySound.setAttribute('src','sounds/enemydestroy.mp3');
        enemySound.volume = 0.5;
        enemySound.play();
        enemiesInPlay = enemiesInPlay.filter(enemy => enemy !== this);
        this.removeDOMElement();
      }
    }

    removeDOMElement() {
      if(this.enemyElement.parentNode) {
        this.enemyElement.parentNode.removeChild(this.enemyElement);
        this.enemyElement = null;
      }
      removeInterval(this.intervalId);
    }

    positionDOMElement() {
      this.enemyElement.style.left = this.xPos + 'px';
      this.enemyElement.style.top = this.yPos + 'px';
    }

    ///////// TRAVEL PATHS FOR EACH ENEMY
    updatePosition1() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 1;
        this.yPos += 1;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos -= 1;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition2() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 1;
        this.yPos -= 1;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos += 1;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition3() {
      //starting xPos is 1000
      if (this.xPos > 550) {
        this.xPos -= 1;
        this.positionDOMElement();
      } else if (this.xPos > 400) {
        this.xPos -= 1;
        this.yPos += .3;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos += .5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition4() {
      //starting xPos is 1000
      if (this.xPos > 550) {
        this.xPos -= 1;
        this.positionDOMElement();
      } else if (this.xPos > 400) {
        this.xPos -= 1;
        this.yPos -= .3;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos -= .5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition5() {
      //starting xPos is 1000
      if (this.xPos > 550) {
        this.xPos -= 1;
        this.positionDOMElement();
      } else if (this.xPos > 400) {
        this.xPos -= 1;
        this.yPos -= .3;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos -= .5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition6() {
      //starting xPos is 1000
      if (this.xPos > 550) {
        this.xPos -= 1;
        this.positionDOMElement();
      } else if (this.xPos > 400) {
        this.xPos -= 1;
        this.yPos += .3;
        this.positionDOMElement();
        //while still on screen
      } else if (this.xPos > -this.width) {
        this.xPos -= 1;
        this.yPos += .5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition7() {
      //starting xPos is 1000
      if (this.yPos < 300 - this.width) {
        this.yPos += 1;
        this.xPos += 0.2;
        this.positionDOMElement();
      } else if (this.yPos < 600) {
        this.yPos += 1;
        this.xPos -= 0.2;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition8() {
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

  /////////////////////////////// LEVEL SETTINGS //////////////////////////////

  let levelTimeouts = [];

  function startWave() {
    ///////////////// LEVEL CREATION ///////////////

    // createEnemiesOfType(enemyType, numberOfEnemies, delay, startNextWave, waveSelect)
    // e.g. createEnemiesOfType('type1', 5, 4000, [true], [2])

    // TODO: Can now use the waveSelect functionality to create true levels and
    // invoke screen prompts;

    /////////// WAVE 1
    if (waveNumber === 1) {
      createEnemiesOfType('type3', 8, 0);
      createEnemiesOfType('type4', 8, 5000);
      createEnemiesOfType('type3', 8, 10000);
      createEnemiesOfType('type4', 8, 15000);
      createEnemiesOfType('type5', 8,20000);
      createEnemiesOfType('type6', 14,20500);
      createEnemiesOfType('type7', 8,30000);
      createEnemiesOfType('type3', 14,350000);
      createEnemiesOfType('type1', 5, 40000);
      createEnemiesOfType('type2', 2, 42000);
      createEnemiesOfType('type1', 3, 48000);
      createEnemiesOfType('type1', 3, 48000, true, 2);
    }

    /////////// WAVE 2
    if (waveNumber === 2) {
      createEnemiesOfType('type7', 12,0);
      createEnemiesOfType('type3', 10,8000);
      createEnemiesOfType('type1', 8,10000);
      createEnemiesOfType('type2', 2, 15000);
      createEnemiesOfType('type6', 8,20000);
      createEnemiesOfType('type7', 12,27000);
      createEnemiesOfType('type3', 8,35000);
      createEnemiesOfType('type4', 8,40000);
      createEnemiesOfType('type2', 8,50000, true, 'gameover');
    }

    /////////// GAMEOVER
    if(!gameOverScreen && waveNumber === 'gameover') {
      levelTimeouts.push(setTimeout(function() {
        gameOver('You survived the battle! Great work!');
      }, 5000));
    }
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


  //////////////////////////   RESET GAME  //////////////////////////////////


  function gameOver(phrase) {
    createGameOverScreen(phrase);
  }


  function resetGame() {
    if(gameOverScreen || gameActive) {
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
      waveNumber = 1;
      if (playingField) {
        playingField.parentNode.removeChild(playingField);
        player1Sound.setAttribute('src','');
        player2Sound.setAttribute('src','');
      }
      if(gameOverScreen) {
        gameOverScreen.parentNode.removeChild(gameOverScreen);
        gameOverScreen = null;
      }
    }
  }
};
