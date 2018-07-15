window.onload = () => {
//

//   ////////////////Declarations///////////////////////
  const game = document.getElementsByClassName('game')[0];
  const score = document.getElementsByClassName('score')[0];
  let scoreCount;
  let livesUsed = 0;
  const enemiesInPlay = [];
  const bulletsInPlay = [];
  const playerRecord = [];
  let bulletId = 0;
  let enemyId = 0;
  let player1Lives = 3;
  //This has been declared last as it didn't work until the player was created.
  //let as this is reassigned to the new player created.
  let player1;
  //   //////////////////////////////////////////////////////
  //   //////////////////////////Movement//////////////////////

  window.addEventListener('keydown', checkKeys);

  function checkKeys(e) {
    const player1Index = livesUsed;
    // right
    if (e.key === 'ArrowRight') {
      //if statement fixes errors for when player is not in DOM (frames between lives)
      if(playerRecord[player1Index]) {
        if(playerRecord[player1Index].xPos < 950) {
          playerRecord[player1Index].xPos+=50;
          player1.style.left = playerRecord[player1Index].xPos + 'px';
        }
      }
    }
    // down
    if (e.key === 'ArrowDown') {
      if(playerRecord[player1Index]) {
        if(playerRecord[player1Index].yPos < 550) {
          playerRecord[player1Index].yPos+=50;
          // console.log(playerY);
          player1.style.top = playerRecord[player1Index].yPos + 'px';
        }
      }
    }
    // left
    if (e.key === 'ArrowLeft') {
      if(playerRecord[player1Index]) {
        if(playerRecord[player1Index].xPos > 0) {
          playerRecord[player1Index].xPos-=50;
          // console.log(playerX);
          player1.style.left = playerRecord[player1Index].xPos + 'px';
        }
      }
    }
    // up
    if (e.key === 'ArrowUp') {
      if(playerRecord[player1Index]) {
        if(playerRecord[player1Index].yPos > 0) {
          playerRecord[player1Index].yPos-=50;
          // console.log(playerY);
          player1.style.top = playerRecord[player1Index].yPos + 'px';
        }
      }
    }
    //Current player coordinates
    // console.log('X:' + playerX + ', Y: ' + playerY);
    /////////////////////////////////////////////////////////

    //************Shoot*******************///
    if (e.key === ' ') {
      if(playerRecord[player1Index]) {
      // console.log(e.key);
        shoot();
      //*1 showBullets();
      }
    }
  }


  //////////////////////////////////////////////////
  //////////////////////score/////////////////////////
  function updateScore() {
    const scoreCountString = scoreCount+'';
    const inputScore = '0'.repeat(6-scoreCountString.length)+scoreCountString;
    score.textContent = inputScore;
  }
  /////////////////////////////////////////////////////
  ///////////////////////Player////////////////////
  function Player(
    playerClass,
    xPos,
    yPos,
    distanceTravelled,
    enemiesKilled,
    powerUp,
    lifePoints
  ) {
    //*************playerStats***********//
    this.class = playerClass;
    this.xPos = xPos;
    this.yPos = yPos;
    this.distanceTravelled = distanceTravelled;
    this.enemiesKilled = enemiesKilled;
    this.powerUp = powerUp;
    this.lifePoints = lifePoints;
  }

  function startplayer1Life() {
    if(player1Lives > 0) {
      const player1X = 0;
      const player1Y = 250;
      const playerTravelled = 0;
      const enemiesKilled = 0;
      const lifePoints = 1;
      const powerUp = 'none';
      const life = new Player('player1', player1X, player1Y, playerTravelled, enemiesKilled, powerUp, lifePoints);
      //started a record of playerStats
      playerRecord.push(life);
      console.log(playerRecord);
      const index = playerRecord.length-1;
      playerRecord[index].createPlayer();
    }
  }

  Player.prototype.createPlayer = function() {
    const playerElement = document.createElement('div');
    playerElement.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    playerElement.setAttribute('class', this.class);
    game.appendChild(playerElement);
    player1 = document.getElementsByClassName('player1')[0];
    this.playerHitBox(playerElement);

  };

  Player.prototype.playerHitBox = function(playerElement) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.lifePoints<1) {
        // console.log('I am true');
        playerElement.parentNode.removeChild(playerElement);
        // console.log(bulletsInPlay.length);
        // console.log(currentBullet.parentNode);
        clearInterval(hit);
        startplayer1Life();
      }
    },50);
  };

  ///////////////////////////////////////////////////////
  ///////////////////Bullet mechanics////////////////
  function Bullet(xPos,yPos,id,hitTarget) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.hitTarget = hitTarget;
  }

  function shoot() {
    //index focuses on the last player created
    const player1Index = livesUsed;
    const bulletX = playerRecord[player1Index].xPos;
    const bulletY = playerRecord[player1Index].yPos+15;
    const fire = new Bullet(bulletX,bulletY,bulletId, 1);
    bulletsInPlay.push(fire);
    const index = bulletsInPlay.length-1;
    bulletsInPlay[index].createBullet();
  }

  Bullet.prototype.createBullet = function() {
    bulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    bullet.setAttribute('class', 'bullet');
    game.appendChild(bullet);
    this.travel(bullet);
    this.targetCheck(bullet);
    // console.log(this.hitTarget);
    // console.log(bulletsInPlay);
  };

  Bullet.prototype.travel = function(currentBullet) {
    const _this = this;
    // console.log(bulletsInPlay.indexOf(_this))
    const travelTime = setInterval(function () {
      if(_this.xPos < 1000) {
        _this.xPos+=50;
        currentBullet.style.left = _this.xPos +'px';
      } else {
        // console.log(currentBullet.parentNode);
        // console.log(bulletsInPlay.indexOf(_this));
        bulletsInPlay.forEach(object => {
          if (object.id === _this.id) {
            bulletsInPlay.splice(bulletsInPlay.indexOf(_this),1);
            currentBullet.parentNode.removeChild(currentBullet);
          }
        });
        clearInterval(travelTime);
      }
    },50);
  };

  Bullet.prototype.targetCheck = function(currentBullet) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.hitTarget<1) {
        // console.log('I am true');
        bulletsInPlay.splice(bulletsInPlay.indexOf(_this),1);
        currentBullet.parentNode.removeChild(currentBullet);
        // console.log(bulletsInPlay.length);
        // console.log(currentBullet.parentNode);
        clearInterval(hit);
      }
    },50);
  };





  ////////////////////////////////////////////////
  ///must use the same parameters for the x and y position in order for collision to work.
  // //////////////enemy creation////////////////////
  function Enemy(enemyClass, xPos, yPos, id) {
    this.class = enemyClass;
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
  }

  //can setnumber of enemies as a variable at the top if needs be later.
  function startWave() {
    // setTimeouts within wave functions
    wave1(8);
    wave2(10);
  // wave3();
  }

  function wave1(numberOfEnemies) {
    setTimeout(function() {
      const enemyX = 1000;
      const enemyY = -37.5;
      let i = numberOfEnemies;
      const releaseEnemy = setInterval(function() {
        if(i > 0) {
          i-=1;
          const spawnedEnemy = new Enemy('wave1', enemyX, enemyY, enemyId);
          enemiesInPlay.push(spawnedEnemy);
          const index = enemiesInPlay.length-1;
          enemiesInPlay[index].createWave1Enemy();
        } else {
          clearInterval(releaseEnemy);
        }
      },500 //********** rate at which wave 1 enemies spawn *************//
      );
    },2000 //************** delay for when wave 2 initiates *****************//
    );
  }

  function wave2(numberOfEnemies) {
    setTimeout(function() {
      const enemyX = 1000;
      const enemyY = -37.5;
      let i = numberOfEnemies;
      const releaseEnemy = setInterval(function() {
        if(i > 0) {
          i-=1;
          const spawnedEnemy = new Enemy('wave2', enemyX, enemyY, enemyId);
          enemiesInPlay.push(spawnedEnemy);
          const index = enemiesInPlay.length-1;
          enemiesInPlay[index].createWave2Enemy();
        } else {
          clearInterval(releaseEnemy);
        }
      },
      500 //********** rate at which wave 2 enemies spawn *************//
      );
    },
    10000 //************** delay for when wave 2 initiates *****************//
    );
  }

  Enemy.prototype.createWave1Enemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.wave1travel(drone);
    this.collisionDetect(drone);
  };

  Enemy.prototype.createWave2Enemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.wave2travel(drone);
    this.collisionDetect(drone);
  };



  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.
  Enemy.prototype.wave1travel = function(drone) {
    // console.log(enemiesInPlay.length);
    const _this = this;
    const movement = setInterval(function() {
      if(_this.yPos <550 && _this.xPos > 400) {
        _this.xPos -= 12.5;
        _this.yPos += 12.5;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if (_this.yPos >0 && _this.xPos > -37.5) {
        _this.xPos -= 12.5;
        _this.yPos -= 12.5;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if(game.children.length > 0) {
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(object.id);
            // console.log(_this.id);
            // console.log(enemiesInPlay.length);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            drone.parentNode.removeChild(drone);
            clearInterval(movement);
          }
        });
      }
    },100); //rate at which enemies move
  };

  Enemy.prototype.wave2travel = function(drone) {
    // console.log(enemiesInPlay.length);
    const _this = this;
    const movement = setInterval(function() {
      if(_this.yPos <550 && _this.xPos > 400) {
        _this.xPos -= 12.5;
        _this.yPos += 12.5;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if (_this.yPos >0 && _this.xPos > -37.5) {
        _this.xPos -= 12.5;
        _this.yPos -= 12.5;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if(game.children.length > 0) {
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(object.id);
            // console.log(_this.id);
            // console.log(enemiesInPlay.length);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            drone.parentNode.removeChild(drone);

            clearInterval(movement);
          }
        });
      }
    },100); //rate at which enemies
  };

  Enemy.prototype.collisionDetect = function(drone) {
    //index focuses on the last player created
    const _this = this;
    const detect = setInterval(function() {
      const player1Index = livesUsed;
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
      bulletsInPlay.forEach(object => {
        if(object.xPos <= xMax && object.xPos + 50 >= xMin
          && object.yPos <= yMax && object.yPos + 10 >= yMin ) {
          object.hitTarget-=1;
          // console.log(object.hitTarget);
          enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
          drone.parentNode.removeChild(drone);
          // console.log(enemiesInPlay.length);
          //need to tie this variable to a score increment unique to the wave of enemies
          scoreCount+=10;
          ///////////////////////////////////////////////
          updateScore();
          clearInterval(detect);
        }
      });
      //player collision//
      //Errors show as there is a gap between removing node and creating new one and collision detection cannot find any player element. This if statement fixes that (undefined is false).
      if(playerRecord[player1Index]) {
        if(playerRecord[player1Index].xPos <= xMax && playerRecord[player1Index].xPos + 50 >= xMin
          && playerRecord[player1Index].yPos <= yMax && playerRecord[player1Index].yPos + 10 >= yMin){
          playerRecord[player1Index].lifePoints -= 1;
          //set position to null on death as enemys may continue to fly through and lower the score.
          playerRecord[player1Index].xPos = null;
          playerRecord[player1Index].yPos = null;
          if(scoreCount-100>0) {
            scoreCount-=100;
            updateScore();
          } else {
            scoreCount-=scoreCount;
            updateScore();
          }
          livesUsed+=1;
          player1Lives -= 1;
        }
      }
    },
    100 // increase for more accurate detection but be mindful of performance. Set at less than bullet/enemy movement.
    );
  };

  function startGame() {
    startWave();
    scoreCount = 0;
    updateScore();
    startplayer1Life();
  }

  startGame();

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
//
};
