window.onload = () => {
//


///////////NOTES//////////////
//known issues//
// if i change overflow from hidden, now and then an enemy will not be removed from the game.

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
        createSelectionScreen()
        setTimeout(function() {
          introScreen.parentNode.removeChild(introScreen);
        },1000);
      }
    }, 2500);
  }, 4500);
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
  player1Heading.textContent = 'Player 1'
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
  // console.log(player1Color);
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
      // console.log(player2Color);
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
      // console.log(player2Color);
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
    p1UpdateScore();
    p2UpdateScore();
    createPlayer('player1')
    if (player2ModeActive === true) {
      createPlayer('player2')
    }
  }

//   ////////////////Declarations///////////////////////


  const p1Score = document.getElementsByClassName('p1-score')[0];
  const p2Score = document.getElementsByClassName('p2-score')[0];
  let p1ScoreCount;
  let p2ScoreCount;
  let p1LivesUsed = 0;
  let p2LivesUsed = 0;
  let enemiesInPlay = [];
  const p1BulletsInPlay = [];
  const p2BulletsInPlay = [];
  let player1Record = [];
  let player2Record = [];
  let p1BulletId = 1; //starts at 1 as this is assigned to the first bullet
  let p2BulletId = 1;
  let enemyId = 0;
  let player1Lives = 3;
  let player2Lives = 3;
  let p1DefaultShotPower = 0; //This can be used to effect powerUps e.g 3 for a period of time;
  let p1ShotPower = 0;
  let p2DefaultShotPower = 0;
  let p2ShotPower = 0;
  let movementIncrement = 2.5; //can use this for powerups, will need to distinguish between p1 and p2 though.
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
      invincible: true
    },

    player2: {
      x: 0,
      y: 280,
      kills: 0,
      lifePoints: 1,
      width: 70,
      height: 25,
      invincible: true
    }
  };

// TODO:Must add more enemy waves and boss
  const enemyTypes = {
    type1: { x: 1000, y: -37.5, lifePoints: 1, score: 10 },
    type2: { x: 1000, y: 575, lifePoints: 2, score: 25 },
    type3: { x: 1000, y: 300, lifePoints: 1, score: 10 },
    type4: { x: 350, y: -37.5, lifePoints: 1, score: 10 },
    type5: { x: 1000, y: 250, lifePoints: 200, score: 1000 }
  };
  //   //////////////////////////////////////////////////////



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

  window.addEventListener('keydown', e => {
    e.preventDefault();

    // console.log(e.key);
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
          p1ChargeShot();
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
          p2ChargeShot();
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
        p1FireShot();
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
        p2FireShot();
        p2TriggerPulled = false;
        break;
    }
  });

  function startMovement(playerNumber, direction) {
    const interval = movementIntervals[playerNumber][direction];
    if (!interval) {
      movementIntervals[playerNumber][direction] = setInterval(() => movePlayer(playerNumber, direction), 10);
    }
  }

  function stopMovement(playerNumber, direction) {
    const interval = movementIntervals[playerNumber][direction];
    if (interval) {
      clearInterval(interval);
      movementIntervals[playerNumber][direction] =  null;
    }
  }

  // window.addEventListener('keydown', p1CheckKeyDown);
  function movePlayer(playerNumber, direction) {
    const playerRecord = playerNumber === 0 ? player1Record : player2Record;
    const playerIndex = playerNumber === 0 ? p1LivesUsed : p2LivesUsed;
    const player = playerNumber === 0 ? player1 : player2;
    const currentRecord = playerRecord[playerIndex];
    //check for if player exists(could be between lives)
    if(currentRecord) {
      switch(direction) {
        case 'right':
          movePlayerRight(currentRecord, player);
          break;
        case 'left':
          movePlayerLeft(currentRecord, player);
          break;
        case 'up':
          movePlayerUp(currentRecord, player);
          break;
        case 'down':
          movePlayerDown(currentRecord, player);
          break;
      }
    }
  }

  function movePlayerRight(currentRecord, player) {
    if(currentRecord.xPos < 1000-currentRecord.width) {
      currentRecord.xPos+=movementIncrement;
      player.style.left = currentRecord.xPos + 'px';
    }
  }

  function movePlayerLeft(currentRecord, player) {
    if(currentRecord.xPos > 0) {
      currentRecord.xPos-=movementIncrement;
      player.style.left = currentRecord.xPos + 'px';
    }
  }

  function movePlayerUp(currentRecord, player) {
    if(currentRecord.yPos > 0) {
      currentRecord.yPos-=movementIncrement;
      player.style.top = currentRecord.yPos + 'px';

    }
  }

  function movePlayerDown(currentRecord, player) {
    if(currentRecord.yPos < 600-currentRecord.height) {
      currentRecord.yPos+=movementIncrement;
      player.style.top = currentRecord.yPos + 'px';
    }
  }


  //////////////////////score/////////////////////////
  function p1UpdateScore() {
    const scoreCountString = p1ScoreCount+'';
    const inputScore = '0'.repeat(6-scoreCountString.length)+scoreCountString;
    p1Score.textContent = inputScore;
  }

  function p2UpdateScore() {
    const scoreCountString = p2ScoreCount+'';
    const inputScore = '0'.repeat(6-scoreCountString.length)+scoreCountString;
    p2Score.textContent = inputScore;
  }
  /////////////////////////////////////////////////////






  ///////////////////////Player Creation////////////////////
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
      this.initialise();
    }

    initialise() {
      this.playerElement = document.createElement('div');
      this.playerElement.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px;`);
      this.playerElement.setAttribute('class', this.class);
      playingField.appendChild(this.playerElement);

      const playerImage = document.createElement('img');
      playerImage.setAttribute('src', `images/ship${player1Color}.png`);
      playerImage.setAttribute('style',`width: ${this.width}px;`);
      this.playerElement.appendChild(playerImage);

      //for movement functions to target DOM element
      this.class === 'player1' ? player1 = this.playerElement : player2 = this.playerElement;

      this.playerHitBox();
      const _this = this;
      levelTimeouts.push(setTimeout(function() {
        _this.invincible = false;
        // console.log(_this.invincible);
      },2000));
    }

    playerHitBox() {
      const _this = this;
      const hit = setInterval(function() {
        if (_this.lifePoints<1) {
          if(_this.playerElement) {
            _this.playerElement.parentNode.removeChild(_this.playerElement);
          }
          clearInterval(hit);
          createPlayer(_this.class);
        }
      },50);
      levelIntervals.push(hit);
    }
  }




  ///////////////////Bullet mechanics//////////////////////////////////////////
  function Bullet(xPos,yPos,id,hitPoints, bulletClass, bulletWidth, bulletHeight, bulletSpeed, img) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.hitPoints = hitPoints;
    this.class = bulletClass;
    this.width = bulletWidth;
    this.height = bulletHeight;
    this.bulletSpeed = bulletSpeed;

    this.img = img; //for when I add images,images will be set of character selection
  }

  let p1Charge;

  function p1ChargeShot() {
    p1Charge = setInterval(() => {
      if(p1ShotPower.toFixed(2)<=3) {
        p1ShotPower +=0.1;
        // console.log(p1ShotPower.toFixed(2));
        // console.log('p1Charging');
      } else if (p1ShotPower.toFixed>3) {
        clearInterval(p1Charge);
      }
      // console.log(p1TriggerPulled);
    },50); //rate of charge
  }

  function p1FireShot() {
    clearInterval(p1Charge);
    if (p1ShotPower<1) {
      p1ShootLvl1();
    } else if(p1ShotPower<2) {
      p1ShootLvl2();
    } else if (p1ShotPower<3) {
      p1ShootLvl3();
    } else if(p1ShotPower>=3){
      p1ShootMax();
    }
    p1ShotPower = p1DefaultShotPower;
    // console.log('p1ChargeClear');
    // console.log(p1ShotPower.toFixed(2));
    // console.log(p1ShotPower);
  }

  function p1ShootLvl1() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    if (player1Record[player1Index]){
      const bulletX = player1Record[player1Index].xPos;
      const bulletY = player1Record[player1Index].yPos+15;
      const hitPoints = 1;
      const bulletClass = 'bulletLvl1';
      const bulletWidth = 40;
      const bulletHeight = 10;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass, bulletWidth, bulletHeight, bulletSpeed);
      p1BulletsInPlay.push(fire);
      const index = p1BulletsInPlay.length-1;
      p1BulletsInPlay[index].p1CreateBullet();
    }
  }
  function p1ShootLvl2() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    if (player1Record[player1Index]){
      const bulletX = player1Record[player1Index].xPos;
      const bulletY = player1Record[player1Index].yPos+15;
      const hitPoints = 2;
      const bulletClass = 'bulletLvl2';
      const bulletWidth = 30;
      const bulletHeight = 10;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p1BulletsInPlay.push(fire);
      const index = p1BulletsInPlay.length-1;
      p1BulletsInPlay[index].p1CreateBullet();
    }
  }
  function p1ShootLvl3() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    if (player1Record[player1Index]){
      const bulletX = player1Record[player1Index].xPos;
      const bulletY = player1Record[player1Index].yPos+15;
      const hitPoints = 3;
      const bulletClass = 'bulletLvl3';
      const bulletWidth = 20;
      const bulletHeight = 15;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p1BulletsInPlay.push(fire);
      const index = p1BulletsInPlay.length-1;
      p1BulletsInPlay[index].p1CreateBullet();
    }
  }
  function p1ShootMax() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    if (player1Record[player1Index]){
      const bulletX = player1Record[player1Index].xPos;
      const bulletY = player1Record[player1Index].yPos+15;
      const hitPoints = 10;
      const bulletClass = 'bulletLvlMax';
      const bulletWidth = 15;
      const bulletHeight = 15;
      const bulletSpeed = 5;
      const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p1BulletsInPlay.push(fire);
      const index = p1BulletsInPlay.length-1;
      p1BulletsInPlay[index].p1CreateBullet();
    }
  }

  function p2ChargeShot() {
        // console.log('im charging')
    // console.log(p1TriggerPulled)
    p2ShotPower = p2DefaultShotPower;
    const charge = setInterval(function() {
      if(p2ShotPower<=3 && p2TriggerPulled === true) {
        p2ShotPower +=0.1;
        // console.log(p1ShotPower)
      } else {
        clearInterval(charge);
      }
      // console.log(p1TriggerPulled);
    },50); //rate of charge
  }

  function p2FireShot() {
        // console.log('im firing')
    if (p2ShotPower<1) {
      p2ShootLvl1();
    } else if(p2ShotPower<2) {
      p2ShootLvl2();
    } else if (p2ShotPower<3) {
      p2ShootLvl3();
    } else if(p2ShotPower>=3){
      p2ShootMax();
    }
    p2ShotPower = p2DefaultShotPower;
    // console.log(p1ShotPower);
  }

  function p2ShootLvl1() {
    // console.log('Imfiring lvl1');
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    if (player2Record[player2Index]){
      const bulletX = player2Record[player2Index].xPos;
      const bulletY = player2Record[player2Index].yPos+15;
      const hitPoints = 1;
      const bulletClass = 'bulletLvl1';
      const bulletWidth = 50;
      const bulletHeight = 10;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass, bulletWidth, bulletHeight, bulletSpeed);
      p2BulletsInPlay.push(fire);
      const index = p2BulletsInPlay.length-1;
      p2BulletsInPlay[index].p2CreateBullet();
    }
  }
  function p2ShootLvl2() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    if (player2Record[player2Index]){
      const bulletX = player2Record[player2Index].xPos;
      const bulletY = player2Record[player2Index].yPos+15;
      const hitPoints = 2;
      const bulletClass = 'bulletLvl2';
      const bulletWidth = 40;
      const bulletHeight = 10;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p2BulletsInPlay.push(fire);
      const index = p2BulletsInPlay.length-1;
      p2BulletsInPlay[index].p2CreateBullet();
    }
  }
  function p2ShootLvl3() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    if (player2Record[player2Index]){
      const bulletX = player2Record[player2Index].xPos;
      const bulletY = player2Record[player2Index].yPos+15;
      const hitPoints = 3;
      const bulletClass = 'bulletLvl3';
      const bulletWidth = 30;
      const bulletHeight = 15;
      const bulletSpeed = 2.5;
      const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p2BulletsInPlay.push(fire);
      const index = p2BulletsInPlay.length-1;
      p2BulletsInPlay[index].p2CreateBullet();
    }
  }
  function p2ShootMax() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    if (player2Record[player2Index]){
      const bulletX = player2Record[player2Index].xPos;
      const bulletY = player2Record[player2Index].yPos+15;
      const hitPoints = 10;
      const bulletClass = 'bulletLvlMax';
      const bulletWidth = 15;
      const bulletHeight = 15;
      const bulletSpeed = 5;
      const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass,  bulletWidth, bulletHeight, bulletSpeed);
      p2BulletsInPlay.push(fire);
      const index = p2BulletsInPlay.length-1;
      p2BulletsInPlay[index].p2CreateBullet();
    }
  }

  Bullet.prototype.p1CreateBullet = function() {
    p1BulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px`);
    bullet.setAttribute('class', this.class);
    playingField.appendChild(bullet);
    this.p1Travel(bullet);
    this.p1TargetCheck(bullet);
    // console.log(this.hitTarget);
    // console.log(bulletsInPlay);
  };

  Bullet.prototype.p2CreateBullet = function() {
    // console.log('Im creating p2 bullet');
    p2BulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', `top: ${this.yPos}px; left: ${this.xPos}px; width: ${this.width}px; height: ${this.height}px`);
    bullet.setAttribute('class', this.class);
    playingField.appendChild(bullet);
    this.p2Travel(bullet);
    this.p2TargetCheck(bullet);
    // console.log(this.hitTarget);
    // console.log(bulletsInPlay);
  };

  Bullet.prototype.p1Travel = function(currentBullet) {
    const _this = this;
    // console.log(bulletsInPlay.indexOf(_this))
    const travelTime = setInterval(function () {
      if(_this.xPos < 1000) {
        _this.xPos+=_this.bulletSpeed;
        currentBullet.style.left = _this.xPos +'px';
      } else {
        // console.log(currentBullet.parentNode);
        // console.log(bulletsInPlay.indexOf(_this));
        p1BulletsInPlay.forEach(object => {
          if (object.id === _this.id) {
            p1BulletsInPlay.splice(p1BulletsInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(currentBullet) {
              currentBullet.parentNode.removeChild(currentBullet);
            }
          }
        });
        clearInterval(travelTime);
      }
    },5); //speed of bullet
  };

  Bullet.prototype.p2Travel = function(currentBullet) {
    // console.log('Im travelling p2 bullet');
    const _this = this;
    // console.log(bulletsInPlay.indexOf(_this))
    const travelTime = setInterval(function () {
      if(_this.xPos < 1000) {
        _this.xPos+=_this.bulletSpeed;
        currentBullet.style.left = _this.xPos +'px';
      } else {
        // console.log(currentBullet.parentNode);
        // console.log(bulletsInPlay.indexOf(_this));
        p2BulletsInPlay.forEach(object => {
          if (object.id === _this.id) {
            p2BulletsInPlay.splice(p2BulletsInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(currentBullet) {
              currentBullet.parentNode.removeChild(currentBullet);
            }
          }
        });
        clearInterval(travelTime);
      }
    },5); //speed of bullet
  };

  Bullet.prototype.p1TargetCheck = function(currentBullet) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.hitPoints<=0) {
        // console.log('I am true');
        p1BulletsInPlay.splice(p1BulletsInPlay.indexOf(_this),1);
        //a check for if the element has been deleted for any reason before this function could do it.
        if(currentBullet) {
          currentBullet.parentNode.removeChild(currentBullet);
        }
        // console.log(bulletsInPlay.length);
        // console.log(currentBullet.parentNode);
        clearInterval(hit);
      }
    },5);
  };

  Bullet.prototype.p2TargetCheck = function(currentBullet) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.hitPoints<=0) {
        // console.log('I am true');
        p2BulletsInPlay.splice(p2BulletsInPlay.indexOf(_this),1);
        //a check for if the element has been deleted for any reason before this function could do it.
        if(currentBullet) {
          currentBullet.parentNode.removeChild(currentBullet);
        }
        // console.log(bulletsInPlay.length);
        // console.log(currentBullet.parentNode);
        clearInterval(hit);
      }
    },5);
  };




  /////////////////////////////////////////////////////////////////////////////






  //////////////////////////////enemy creation//////////////////////////////////
  function createEnemiesOfClass(enemyClass, numberOfEnemies, delay) {
    levelTimeouts.push(setTimeout(function() {
      console.log(levelTimeouts);
      if(gameActive) {
        let i = numberOfEnemies;
        const releaseEnemy = setInterval(function() {
          if (gameActive === false) {
            clearInterval(releaseEnemy);
          } else if(i > 0) {
            i-=1;
            const spawnedEnemy = new Enemy(enemyClass, enemyId);
            enemiesInPlay.push(spawnedEnemy);
          } else {
            clearInterval(releaseEnemy);
          }
        },700 //********** rate at which type 1 enemies spawn *************//
        );
      }
    },delay //************** delay for when type 2 initiates *****************//
    ));
  }

  class Enemy {
    constructor(enemyClass, id) {
      const enemy = enemyTypes[enemyClass];
      this.class = enemyClass;
      this.xPos = enemy.x;
      this.yPos = enemy.y;
      this.id = id;
      this.lifePoints = enemy.lifePoints;
      this.score = enemy.score;
      this.setUpdatePositionFunction();
      console.log(`Created enemy ${enemyClass}`, this.positionFunction);
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
      enemyId +=1;
      this.drone = document.createElement('div');
      this.drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
      this.drone.setAttribute('class', this.class);
      playingField.appendChild(this.drone);
      this.travel();
      this.collisionDetect(this.drone);
    }

    collisionDetect() {

    }

    removeDOMElement() {
      if(this.drone.parentNode) {
        this.drone.parentNode.removeChild(this.drone);
        this.drone = null;
      }
    }

    travel() {
      const _this = this;
      const movement = setInterval(function() {
        console.log(playingField.children.length);
        const positionWasUpdated = _this.positionFunction();
        if (!positionWasUpdated) {
          if(playingField.children.length > 0) {
            console.log('should remove');
            // Remove from enemiesInPlay
            enemiesInPlay = enemiesInPlay.filter(enemy => enemy !== _this);
            _this.removeDOMElement();
            clearInterval(movement);
          }
        }
      },50);
      levelIntervals.push(movement); //rate at which enemies move
    }

    positionDOMElement() {
      this.drone.style.left = this.xPos + 'px';
      this.drone.style.top = this.yPos + 'px';
    }

    updatePosition1() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 5;
        this.yPos += 5;
        this.positionDOMElement()
      } else if (this.xPos > -50) {
        this.xPos -= 5;
        this.yPos -= 5;
        this.positionDOMElement()
      } else {
        return false;
      }
      return true;
    }

    updatePosition2() {
      //starting xPos is 1000
      if(this.xPos > 412.5) {
        this.xPos -= 5;
        this.yPos -= 5;
        this.positionDOMElement();
      } else if (this.xPos > -50) {
        this.xPos -= 5;
        this.yPos += 5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition3() {
      //starting xPos is 1000
      if (this.xPos > -50) {
        this.xPos -= 5;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition4() {
      //starting xPos is 1000
      if (this.yPos < 300 - 50) {
        this.yPos += 10;
        this.xPos += 1;
        this.positionDOMElement();
      } else if (this.yPos < 600) {
        this.yPos += 5;
        this.xPos -= 1;
        this.positionDOMElement();
      } else {
        return false;
      }
      return true;
    }

    updatePosition5() {
      //starting xPos is 1000
      if (this.lifePoints > 100 && this.xPos >= 0) {
        this.xPos -= 2;
        this.positionDOMElement();
      } else if (this.lifePoints > 50 && this.xPos <= 600 && this.xPos >= 0  ) {
        this.xPos +=5;
        this.positionDOMElement();
      } else if (this.lifePoints > 0 && this.xPos >= 0) {
        this.xPos -=5;
        this.positionDOMElement();
      } else if (this.lifePoints > 0 && this.xPos <= 600) {
        this.xPos +=5;
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
  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.

  Enemy.prototype.collisionDetect = function(drone) {
    //index focuses on the last player created
    const _this = this;
    const detect = setInterval(function() {
      const player1Index = p1LivesUsed;
      const player2Index = p2LivesUsed;
      // console.log(drone.offsetWidth);
      const xMin = _this.xPos;
      const xMax = _this.xPos + drone.offsetWidth;
      const yMin = _this.yPos;
      const yMax = _this.yPos + drone.offsetHeight;
      // console.log('xmin:' + xMin)
      // console.log('xman:' + xMax)
      // console.log('ymin:' + yMin)
      // console.log('ymax:' + xMax)
      // console.log('ymax:' + xMax)
      // console.log(game.children.length);

      //bullet collision//
      p1BulletsInPlay.forEach(object => {
        //width of bullet is hardcoded, needs to be dynamic, as different level shots may have different widths.
        if(object.xPos <= xMax && object.xPos + 50 >= xMin
          && object.yPos <= yMax && object.yPos + 10 >= yMin) {
          // console.log(_this.lifePoints);
          const temp = _this.lifePoints;
          _this.lifePoints-=object.hitPoints;
          object.hitPoints-=temp;
          // console.log(_this.lifePoints);
          // console.log(object.hitTarget);
          if(_this.lifePoints <= 0) {
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it. Still doesnt work.
            // console.log(drone);
            if (drone.parentNode) {
              drone.parentNode.removeChild(drone);
            }
            // console.log(enemiesInPlay.length);
            p1ScoreCount+=_this.score;
            ///////////////////////////////////////////////
            p1UpdateScore();
            clearInterval(detect);
          }
        }
      });

      p2BulletsInPlay.forEach(object => {
        //width of bullet is hardcoded, needs to be dynamic, as different level shots may have different widths.
        if(object.xPos <= xMax && object.xPos + 50 >= xMin
          && object.yPos <= yMax && object.yPos + 10 >= yMin) {
          // console.log(_this.lifePoints);
          const temp = _this.lifePoints;
          _this.lifePoints-=object.hitPoints;
          object.hitPoints-=temp;
          // console.log(_this.lifePoints);
          // console.log(object.hitTarget);
          if(_this.lifePoints <= 0) {
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it. Still doesnt work.
            if(drone) {
              drone.parentNode.removeChild(drone);
            }
            // console.log(enemiesInPlay.length);
            p2ScoreCount+=_this.score;
            ///////////////////////////////////////////////
            p2UpdateScore();
            clearInterval(detect);
          }
        }
      });

      //***************//player1 collision//******************///
      //Errors show as there is a gap between removing node and creating new one and collision detection cannot find any player element. This if statement fixes that (undefined is false).
      if(player1Record[player1Index]) {
        if(player1Record[player1Index].xPos <= xMax && player1Record[player1Index].xPos + 50 >= xMin
          && player1Record[player1Index].yPos <= yMax && player1Record[player1Index].yPos + 10 >= yMin && player1Record[player1Index].invincible === false){
          player1Record[player1Index].lifePoints -= 1;
          //set position to null on death as enemys may continue to fly through and lower the score.
          player1Record[player1Index].xPos = null;
          player1Record[player1Index].yPos = null;
          if(p1ScoreCount-100>0) {
            p1ScoreCount-=100;
            p1UpdateScore();
          } else {
            p1ScoreCount-=p1ScoreCount;
            p1UpdateScore();
          }
          p1LivesUsed+=1;
          player1Lives -= 1;
        }
      }
      //***************//player2 collision//******************///
      //Errors show as there is a gap between removing node and creating new one and collision detection cannot find any player element. This if statement fixes that (undefined is false).
      if(player2Record[player2Index]) {
        if(player2Record[player2Index].xPos <= xMax && player2Record[player2Index].xPos + 50 >= xMin
          && player2Record[player2Index].yPos <= yMax && player2Record[player2Index].yPos + 10 >= yMin && player2Record[player2Index].invincible === false){
          player2Record[player2Index].lifePoints -= 1;
          //set position to null on death as enemys may continue to fly through and lower the score.
          player2Record[player2Index].xPos = null;
          player2Record[player2Index].yPos = null;
          if(p2ScoreCount-100>0) {
            p2ScoreCount-=100;
            p2UpdateScore();
          } else {
            p2ScoreCount-=p2ScoreCount;
            p2UpdateScore();
          }
          p2LivesUsed+=1;
          player2Lives -= 1;
        }
      }
    },
    10 // increase for more accurate detection but be mindful of performance. Set at at a greater value than bullet/enemy movement and targetDetect(bullet removal function) - this is important.
    );
  };


  //////////////////////////Start Game///////////////////////////////////////////


  const resetButton = document.getElementsByClassName('reset')[0];
  resetButton.addEventListener('click',resetGame);

  function resetGame() {
    gameActive = false;
    createSelectionScreen();
    enemiesInPlay = [];
    player1Record = [];
    player2Record = [];
    p1BulletId = 1; //starts at 1 as this is assigned to the first bullet
    p2BulletId = 1;
    enemyId = 0;
    player1Lives = 3;
    player2Lives = 3;
    p1LivesUsed = 0;
    p2LivesUsed = 0;
    console.log(levelTimeouts);
    levelTimeouts.forEach(timeout => clearInterval(timeout));
    levelTimeouts = [];
    levelIntervals.forEach(Intervals => clearInterval(Intervals));
    levelIntervals = [];
    if (playingField) {
      playingField.parentNode.removeChild(playingField);
    }
    //need to clear screen
    //empty the player arrays and enemy arrays(?);
  }




//
//
//
//
//
//
//
//
//   ////////////////Follow cursor attempt/////////////////////////
//   // const player = document.getElementsByClassName('player')[0];
//   // const center = document.getElementsByClassName('center')[0];
//   // center.addEventListener('click', activateDrag);
//   //
//   // function drag(event) {
//   //   const mousex = event.clientX;
//   //   const mousey = event.clientY;
//   //   console.log(mousey);
//   //   console.log(mousex);
//   //   player.style.bottom = mousey + 'px';
//   //   player.style.left = mousex + 'px';
//   // }
//   //
//   //
//   // function activateDrag(e) {
//   //   player.addEventListener('mouseover', drag);
//   //   drag(e);
//   // }

// Old player controls
//  // function p1CheckKeyDown(e) {
  //   const player1Index = p1LivesUsed;
  //   // right
  //   if (e.key === 'ArrowRight') {
  //     if statement fixes errors for when player is not in DOM (frames between lives)
  //     if(player1Record[player1Index]) {
  //       if(player1Record[player1Index].xPos < 950) {
  //         player1Record[player1Index].xPos+=50;
  //         player1.style.left = player1Record[player1Index].xPos + 'px';
  //       }
  //     }
  //   }
  //   // down
  //   if (e.key === 'ArrowDown') {
  //     if(player1Record[player1Index]) {
  //       if(player1Record[player1Index].yPos < 550) {
  //         player1Record[player1Index].yPos+=50;
  //         // console.log(playerY);
  //         player1.style.top = player1Record[player1Index].yPos + 'px';
  //       }
  //     }
  //   }
  //   // left
  //   if (e.key === 'ArrowLeft') {
  //     if(player1Record[player1Index]) {
  //       if(player1Record[player1Index].xPos > 0) {
  //         player1Record[player1Index].xPos-=50;
  //         // console.log(playerX);
  //         player1.style.left = player1Record[player1Index].xPos + 'px';
  //       }
  //     }
  //   }
  //   // up
  //   if (e.key === 'ArrowUp') {
  //     if(player1Record[player1Index]) {
  //       if(player1Record[player1Index].yPos > 0) {
  //         player1Record[player1Index].yPos-=50;
  //         // console.log(playerY);
  //         player1.style.top = player1Record[player1Index].yPos + 'px';
  //       }
  //     }
  //   }
  //   //Current player coordinates
  //   // console.log('X:' + playerX + ', Y: ' + playerY);
  //   /////////////////////////////////////////////////////////
  //
  //   //************Shoot*******************///
  //
  //   if (e.key === 'm') {
  //     if(player1Record[player1Index]) {
  //     // console.log(e.key);
  //       if(p1TriggerPulled === false) {
  //         p1ChargeShot();
  //
  //       }
  //     //*1 showBullets();
  //     }
  //   }
  //   p1TriggerPulled = true;
  // }
  // window.addEventListener('keyup', p1CheckKeyUp);
  //
  // function p1CheckKeyUp(e) {
  //
  //   const player1Index = p1LivesUsed;
  //   if (e.key === 'm') {
  //     if(player1Record[player1Index]) {
  //     // console.log(e.key);
  //       if(p1TriggerPulled === true) {
  //         p1FireShot();
  //       }
  //     //*1 showBullets();
  //     }
  //   }
  //   p1TriggerPulled = false;
  // }
  // //   //////////////////////////player 2 Movement//////////////////////
  // // window.addEventListener('keydown', p2CheckKeyDown);
  //
  // function p2CheckKeyDown(e) {
  //   // console.log(e.key);
  //   const player2Index = p2LivesUsed;
  //   // right
  //   if (e.key === 'd') {
  //     //if statement fixes errors for when player is not in DOM (frames between lives)
  //     if(player2Record[player2Index]) {
  //       if(player2Record[player2Index].xPos < 950) {
  //         player2Record[player2Index].xPos+=50;
  //         player2.style.left = player2Record[player2Index].xPos + 'px';
  //       }
  //     }
  //   }
  //   // down
  //   if (e.key === 's') {
  //     if(player2Record[player2Index]) {
  //       if(player2Record[player2Index].yPos < 550) {
  //         player2Record[player2Index].yPos+=50;
  //         // console.log(playerY);
  //         player2.style.top = player2Record[player2Index].yPos + 'px';
  //       }
  //     }
  //   }
  //   // left
  //   if (e.key === 'a') {
  //     if(player2Record[player2Index]) {
  //       if(player2Record[player2Index].xPos > 0) {
  //         player2Record[player2Index].xPos-=50;
  //         // console.log(playerX);
  //         player2.style.left = player2Record[player2Index].xPos + 'px';
  //       }
  //     }
  //   }
  //   // up
  //   if (e.key === 'w') {
  //     if(player2Record[player2Index]) {
  //       if(player2Record[player2Index].yPos > 0) {
  //         player2Record[player2Index].yPos-=50;
  //         // console.log(playerY);
  //         player2.style.top = player2Record[player2Index].yPos + 'px';
  //       }
  //     }
  //   }
  //
  //   /////////////////////////////////////////////////////////
  //
  //   //************Shoot*******************///
  //   if (e.key === 'c') {
  //     console.log('im c')
  //     if(player2Record[player2Index]) {
  //     // console.log(e.key);
  //       if(p2TriggerPulled === false) {
  //         p2ChargeShot();
  //
  //       }
  //     //*1 showBullets();
  //     }
  //   }
  //   p2TriggerPulled = true;
  // }
  // // window.addEventListener('keyup', p2CheckKeyUp);
  //
  // function p2CheckKeyUp(e) {
  //
  //   const player2Index = p2LivesUsed;
  //   if (e.key === 'c') {
  //         console.log('im c up')
  //     if(player2Record[player2Index]) {
  //     // console.log(e.key);
  //       if(p2TriggerPulled === true) {
  //         p2FireShot();
  //       }
  //     //*1 showBullets();
  //     }
  //   }
  //   p2TriggerPulled = false;
  // }

  //////////////////////////////////////////////////
};
