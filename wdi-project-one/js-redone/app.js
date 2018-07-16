window.onload = () => {
//


///////////NOTES//////////////
//known issue where if player spams bullets at high rate, cannot remove drone. this
//is because the detection rate is too slow and two bullets can enter the position of the drone
//and therefore fucntion tries to remove the same drone twice. increase detection rate?

//NEED TO FIX BULLET CHARGE INTERVAL, Charge doesnt work as keydown is cancelled on press of other buttons.
//Need to push to an array. Need to separate functions from input, then activate those functions via the array.
//////////////////////////////

//   ////////////////Declarations///////////////////////
  const game = document.getElementsByClassName('game')[0];
  let player2Mode = true; //will be included in intro so player can select.
  const p1Score = document.getElementsByClassName('p1-score')[0];
  const p2Score = document.getElementsByClassName('p2-score')[0];
  let p1ScoreCount;
  let p2ScoreCount;
  let p1LivesUsed = 0;
  let p2LivesUsed = 0;
  const enemiesInPlay = [];
  const p1BulletsInPlay = [];
  const p2BulletsInPlay = [];
  const player1Record = [];
  const player2Record = [];
  let p1BulletId = 0;
  let p2BulletId = 0;
  let enemyId = 0;
  let player1Lives = 3;
  let player2Lives = 3;
  let p1DefaultShotPower = 0; //This can be used to effect powerUps e.g 3 for a period of time;
  let p1ShotPower = 0;
  let p1TriggerPulled = false; //This can be used to effect powerUps e.g 3 for a period of time;
  let p2DefaultShotPower = 0;
  let p2TriggerPulled = false;
  let p2ShotPower = 0;
  let movementIncrement = 5;
  //These is declared as let as they are rassigned when they have been removed from DOM
  let player1;
  let player2;
  //   //////////////////////////////////////////////////////
  //   //////////////////////////player 1 Movement//////////////////////
  const movementIntervals = [{}, {}];
  // DELETE ALL OF THIS
  const logDiv = document.getElementById('log');
  setInterval(() => logDiv.textContent = `${movementIntervals[0]['left']}, ${movementIntervals[0]['right']} ${movementIntervals[0]['down']}, ${movementIntervals[0]['up']}`, 100);

  window.addEventListener('keydown', e => {
    e.preventDefault();
    switch(e.key) {
      case 'ArrowLeft':
        startMovement(0, 'left');
        break;
      case 'ArrowRight':
        startMovement(0, 'right');
        break;
      case 'ArrowUp':
        startMovement(0, 'up');
        break;
      case 'ArrowDown':
        startMovement(0, 'down');
        break;
      case 'w':
        startMovement(1, 'up');
        break;
      case 'a':
        startMovement(1, 'left');
        break;
      case 's':
        startMovement(1, 'down');
        break;
      case 'd':
        startMovement(1, 'right');
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch(e.key) {
      case 'ArrowLeft':
        stopMovement(0, 'left');
        break;
      case 'ArrowRight':
        stopMovement(0, 'right');
        break;
      case 'ArrowUp':
        stopMovement(0, 'up');
        break;
      case 'ArrowDown':
        stopMovement(0, 'down');
        break;
      case 'w':
        stopMovement(1, 'up');
        break;
      case 'a':
        stopMovement(1, 'left');
        break;
      case 's':
        stopMovement(1, 'down');
        break;
      case 'd':
        stopMovement(1, 'right');
        break;
    }
  });

  function startMovement(i, direction) {
    const interval = movementIntervals[i][direction];
    if (!interval) {
      movementIntervals[i][direction] = setInterval(() => movePlayer(i, direction), 10);
    }
  }

  function stopMovement(i, direction) {
    const interval = movementIntervals[i][direction];
    if (interval) {
      clearInterval(interval);
      movementIntervals[i][direction] =  null;
    }
  }

  // window.addEventListener('keydown', p1CheckKeyDown);
  function movePlayer(playerNumber, direction) {
    const playerRecord = playerNumber === 1 ? player1Record : player2Record;
    const playerIndex = playerNumber === 1 ? p1LivesUsed : p2LivesUsed;
    const player = playerNumber === 1 ? player1 : player2;
    const currentRecord = playerRecord[playerIndex];
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
    if(currentRecord.xPos < 950) {
      currentRecord.xPos+=movementIncrement;
      player.style.left = currentRecord.xPos + 'px';
    }
  }

  function movePlayerLeft(currentRecord, player) {
    if(currentRecord.xPos > movementIncrement) {
      currentRecord.xPos-=movementIncrement;
      player.style.left = currentRecord.xPos + 'px';
    }
  }

  function movePlayerUp(currentRecord, player) {
    if(currentRecord.yPos > movementIncrement) {
      currentRecord.yPos-=movementIncrement;
      player.style.top = currentRecord.yPos + 'px';
    }
  }

  function movePlayerDown(currentRecord, player) {
    if(currentRecord.yPos < 550) {
      currentRecord.yPos+=movementIncrement;
      player.style.top = currentRecord.yPos + 'px';
    }
  }

  // function p1CheckKeyDown(e) {
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
  ///////////////////////Player////////////////////
  function Player(
    playerClass,
    xPos,
    yPos,
    distanceTravelled,
    enemiesKilled,
    powerUp,
    lifePoints,
    invincible
  ) {
    //*************playerStats***********//
    this.class = playerClass;
    this.xPos = xPos;
    this.yPos = yPos;
    this.distanceTravelled = distanceTravelled;
    this.enemiesKilled = enemiesKilled;
    this.powerUp = powerUp;
    this.lifePoints = lifePoints;
    this.invincible = invincible;
  }

  function startPlayer1Life() {
    if(player1Lives > 0) {
      const player1X = 0;
      const player1Y = 250;
      const playerTravelled = 0;
      const enemiesKilled = 0;
      const lifePoints = 1;
      const invincible = true;
      const powerUp = 'none';
      const life = new Player('player1', player1X, player1Y, playerTravelled, enemiesKilled, powerUp, lifePoints, invincible);
      //started a record of playerStats
      player1Record.push(life);
      // console.log(life.invincible);
      const index = player1Record.length-1;
      player1Record[index].createPlayer1();
    }
  }

  function startPlayer2Life() {
    if(player2Lives > 0) {
      const player2X = 0;
      const player2Y = 250;
      const playerTravelled = 0;
      const enemiesKilled = 0;
      const lifePoints = 1;
      const invincible = true;
      const powerUp = 'none';
      const life = new Player('player2', player2X, player2Y, playerTravelled, enemiesKilled, powerUp, lifePoints, invincible);
      //started a record of playerStats
      player2Record.push(life);
      // console.log(player2Record);
      const index = player2Record.length-1;
      player2Record[index].createPlayer2();
    }
  }

  Player.prototype.createPlayer1 = function() {
    const playerElement = document.createElement('div');
    playerElement.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    playerElement.setAttribute('class', this.class);
    game.appendChild(playerElement);
    player1 = document.getElementsByClassName('player1')[0];
    this.player1HitBox(playerElement);
    const _this = this;
    setTimeout(function() {
      _this.invincible = false;
      console.log(_this.invincible);
    },2000);
  };
// FINISH THIS FOR P2 and PUT IN IF STATEMENT FOR ENEMY COLLISION, IF INVINCIBLE IS FALSE
  Player.prototype.createPlayer2 = function() {
    const playerElement = document.createElement('div');
    playerElement.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    playerElement.setAttribute('class', this.class);
    game.appendChild(playerElement);
    player2 = document.getElementsByClassName('player2')[0];
    this.player2HitBox(playerElement);
    const _this = this;
    setTimeout(function() {
      _this.invincible = false;
    },2000);
  };

  Player.prototype.player1HitBox = function(playerElement) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.lifePoints<1) {
        // console.log('I am true');
        //a check for if the element has been deleted for any reason before this function could do it.
        if(playerElement) {
          playerElement.parentNode.removeChild(playerElement);
        }
        clearInterval(hit);
        startPlayer1Life();
      }
    },50);
  };

  Player.prototype.player2HitBox = function(playerElement) {
    const _this = this;
    const hit = setInterval(function() {
      if (_this.lifePoints<1) {
        // console.log('I am true');
        //a check for if the element has been deleted for any reason before this function could do it.
        if(playerElement) {
          playerElement.parentNode.removeChild(playerElement);
        }
        clearInterval(hit);
        startPlayer2Life();
      }
    },50);
  };

  ///////////////////////////////////////////////////////





  ///////////////////Bullet mechanics//////////////////////////////////////////
  function Bullet(xPos,yPos,id,hitPoints, bulletClass) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.hitPoints = hitPoints;
    this.class = bulletClass;
  }

  function p1ChargeShot() {
    // console.log(p1TriggerPulled)
    p1ShotPower = p1DefaultShotPower;
    const charge = setInterval(function() {
      if(p1ShotPower<=3 && p1TriggerPulled === true) {
        p1ShotPower +=0.1;
        // console.log(p1ShotPower)
      } else {
        clearInterval(charge);
      }
      // console.log(p1TriggerPulled);
    },50); //rate of charge
  }

  function p1FireShot() {
    if (p1ShotPower<1) {
      p1ShootLvl1();
    } else if(p1ShotPower<2) {
      p1ShootLvl2();
    }else if (p1ShotPower<3) {
      p1ShootLvl3();
    } else if(p1ShotPower>=3){
      p1ShootMax();
    }
    p1ShotPower = p1DefaultShotPower;
    // console.log(p1ShotPower);
  }

  function p1ShootLvl1() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    const bulletX = player1Record[player1Index].xPos;
    const bulletY = player1Record[player1Index].yPos+15;
    const hitPoints = 1;
    const bulletClass = 'bulletLvl1';
    const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass);
    p1BulletsInPlay.push(fire);
    const index = p1BulletsInPlay.length-1;
    p1BulletsInPlay[index].p1CreateBullet();
  }
  function p1ShootLvl2() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    const bulletX = player1Record[player1Index].xPos;
    const bulletY = player1Record[player1Index].yPos+15;
    const hitPoints = 2;
    const bulletClass = 'bulletLvl2';
    const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass);
    p1BulletsInPlay.push(fire);
    const index = p1BulletsInPlay.length-1;
    p1BulletsInPlay[index].p1CreateBullet();
  }
  function p1ShootLvl3() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    const bulletX = player1Record[player1Index].xPos;
    const bulletY = player1Record[player1Index].yPos+15;
    const hitPoints = 3;
    const bulletClass = 'bulletLvl3';
    const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass);
    p1BulletsInPlay.push(fire);
    const index = p1BulletsInPlay.length-1;
    p1BulletsInPlay[index].p1CreateBullet();
  }
  function p1ShootMax() {
    //index focuses on the last player created
    const player1Index = p1LivesUsed;
    const bulletX = player1Record[player1Index].xPos;
    const bulletY = player1Record[player1Index].yPos+15;
    const hitPoints = 10;
    const bulletClass = 'bulletLvlMax';
    const fire = new Bullet(bulletX,bulletY,p1BulletId, hitPoints, bulletClass);
    p1BulletsInPlay.push(fire);
    const index = p1BulletsInPlay.length-1;
    p1BulletsInPlay[index].p1CreateBullet();
  }

  function p2ChargeShot() {
        console.log('im charging')
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
        console.log('im firing')
    if (p2ShotPower<1) {
      p2ShootLvl1();
    } else if(p2ShotPower<2) {
      p2ShootLvl2();
    }else if (p2ShotPower<3) {
      p2ShootLvl3();
    } else if(p2ShotPower>=3){
      p2ShootMax();
    }
    p2ShotPower = p2DefaultShotPower;
    // console.log(p1ShotPower);
  }

  function p2ShootLvl1() {
    console.log('Imfiring lvl1');
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    const bulletX = player2Record[player2Index].xPos;
    const bulletY = player2Record[player2Index].yPos+15;
    const hitPoints = 1;
    const bulletClass = 'bulletLvl1';
    const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass);
    p2BulletsInPlay.push(fire);
    const index = p2BulletsInPlay.length-1;
    p2BulletsInPlay[index].p2CreateBullet();
  }
  function p2ShootLvl2() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    const bulletX = player2Record[player2Index].xPos;
    const bulletY = player2Record[player2Index].yPos+15;
    const hitPoints = 2;
    const bulletClass = 'bulletLvl2';
    const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass);
    p2BulletsInPlay.push(fire);
    const index = p2BulletsInPlay.length-1;
    p2BulletsInPlay[index].p2CreateBullet();
  }
  function p2ShootLvl3() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    const bulletX = player2Record[player2Index].xPos;
    const bulletY = player2Record[player2Index].yPos+15;
    const hitPoints = 3;
    const bulletClass = 'bulletLvl3';
    const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass);
    p2BulletsInPlay.push(fire);
    const index = p2BulletsInPlay.length-1;
    p2BulletsInPlay[index].p2CreateBullet();
  }
  function p2ShootMax() {
    //index focuses on the last player created
    const player2Index = p2LivesUsed;
    const bulletX = player2Record[player2Index].xPos;
    const bulletY = player2Record[player2Index].yPos+15;
    const hitPoints = 10;
    const bulletClass = 'bulletLvlMax';
    const fire = new Bullet(bulletX,bulletY,p2BulletId, hitPoints, bulletClass);
    p2BulletsInPlay.push(fire);
    const index = p2BulletsInPlay.length-1;
    p2BulletsInPlay[index].p2CreateBullet();
  }

  Bullet.prototype.p1CreateBullet = function() {
    p1BulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    bullet.setAttribute('class', this.class);
    game.appendChild(bullet);
    this.p1Travel(bullet);
    this.p1TargetCheck(bullet);
    // console.log(this.hitTarget);
    // console.log(bulletsInPlay);
  };

  Bullet.prototype.p2CreateBullet = function() {
    console.log('Im creating p2 bullet');
    p2BulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    bullet.setAttribute('class', this.class);
    game.appendChild(bullet);
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
        _this.xPos+=6.125;
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
    console.log('Im travelling p2 bullet');
    const _this = this;
    // console.log(bulletsInPlay.indexOf(_this))
    const travelTime = setInterval(function () {
      if(_this.xPos < 1000) {
        _this.xPos+=6.125;
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
  function Enemy(enemyClass, xPos, yPos, id, lifePoints, score) {
    this.class = enemyClass;
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id;
    this.lifePoints = lifePoints;
    this.score = score;

  }

  //can setnumber of enemies as a variable at the top if needs be later.
  function startWaves() {
    //level creation
    // numberOfEnemies, delay
    // wave1(8,2000);
    wave2(10,2000);
    // wave3(8,15000);
    // wave2(14,20000);
    // wave1(8,25000);
    // wave2(14,32000);
    // wave1(8,40000);


  // wave3();
  }

  function wave1(numberOfEnemies,delay) {
    setTimeout(function() {
      const enemyX = 1000;
      const enemyY = -37.5;
      const lifePoints = 1;
      const score = 10;
      let i = numberOfEnemies;
      const releaseEnemy = setInterval(function() {
        if(i > 0) {
          i-=1;
          const spawnedEnemy = new Enemy('wave1', enemyX, enemyY, enemyId, lifePoints , score);
          // console.log(spawnedEnemy);
          enemiesInPlay.push(spawnedEnemy);
          const index = enemiesInPlay.length-1;
          enemiesInPlay[index].createWave1Enemy();
        } else {
          clearInterval(releaseEnemy);
        }
      },500 //********** rate at which wave 1 enemies spawn *************//
      );
    },delay //************** delay for when wave 2 initiates *****************//
    );
  }

  function wave2(numberOfEnemies,delay) {
    setTimeout(function() {
      const enemyX = 1000;
      const enemyY = 575;
      const lifePoints = 2;
      const score = 25;
      let i = numberOfEnemies;
      const releaseEnemy = setInterval(function() {
        if(i > 0) {
          i-=1;
          const spawnedEnemy = new Enemy('wave2', enemyX, enemyY, enemyId, lifePoints, score);
          enemiesInPlay.push(spawnedEnemy);
          const index = enemiesInPlay.length-1;
          enemiesInPlay[index].createWave2Enemy();
          // console.log(enemiesInPlay[index]);
        } else {
          clearInterval(releaseEnemy);
        }
      },
      500 //********** rate at which wave 2 enemies spawn *************//
      );
    },
    delay //************** delay for when wave 2 initiates *****************//
    );
  }

  function wave3(numberOfEnemies,delay) {
    setTimeout(function() {
      const enemyX = 1000;
      const enemyY = 300;
      const lifePoints = 1;
      const score = 10;
      let i = numberOfEnemies;
      const releaseEnemy = setInterval(function() {
        if(i > 0) {
          i-=1;
          const spawnedEnemy = new Enemy('wave3', enemyX, enemyY, enemyId, lifePoints, score);
          enemiesInPlay.push(spawnedEnemy);
          const index = enemiesInPlay.length-1;
          enemiesInPlay[index].createWave3Enemy();
        } else {
          clearInterval(releaseEnemy);
        }
      },
      500 //********** rate at which wave 2 enemies spawn *************//
      );
    },
    delay //************** delay for when wave 2 initiates *****************//
    );
  }

  Enemy.prototype.createWave1Enemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.wave1Travel(drone);
    this.collisionDetect(drone);
  };

  Enemy.prototype.createWave2Enemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.wave2Travel(drone);
    this.collisionDetect(drone);
  };

  Enemy.prototype.createWave3Enemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.wave3Travel(drone);
    this.collisionDetect(drone);
  };


  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.
  Enemy.prototype.wave1Travel = function(drone) {
    // console.log(enemiesInPlay.length);
    const _this = this;
    const movement = setInterval(function() {
      //starting xPos is 1000
      if(_this.xPos > 412.5) {
        _this.xPos -= 6.125;
        _this.yPos += 6.125;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if (_this.xPos > -37.5) {
        _this.xPos -= 6.125;
        _this.yPos -= 6.125;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if(game.children.length > 0) {
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(object.id);
            // console.log(_this.id);
            // console.log(enemiesInPlay.length);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(drone) {
              drone.parentNode.removeChild(drone);
            }
            clearInterval(movement);
          }
        });
      }
    },50); //rate at which enemies move
  };

  Enemy.prototype.wave2Travel = function(drone) {
    // console.log(enemiesInPlay.length);
    const _this = this;
    const movement = setInterval(function() {
      //starting xPos is 1000
      if(_this.xPos > 412.5) {
        _this.xPos -= 6.125;
        _this.yPos -= 6.125;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if (_this.xPos > -37.5) {
        _this.xPos -= 6.125;
        _this.yPos += 6.125;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if(game.children.length > 0) {
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(object.id);
            // console.log(_this.id);
            // console.log(enemiesInPlay.length);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(drone) {
              drone.parentNode.removeChild(drone);
            }
            clearInterval(movement);
          }
        });
      }
    },50); //rate at which enemies
  };

  Enemy.prototype.wave3Travel = function(drone) {
    // console.log(enemiesInPlay.length);
    const _this = this;
    const movement = setInterval(function() {
      //starting xPos is 1000
      if (_this.xPos > -37.5) {
        _this.xPos -= 6.125;
        drone.style.left = _this.xPos + 'px';
      } else if(game.children.length > 0) {
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(object.id);
            // console.log(_this.id);
            // console.log(enemiesInPlay.length);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(drone) {
              drone.parentNode.removeChild(drone);
            }
            clearInterval(movement);
          }
        });
      }
    },50); //rate at which enemies
  };

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
          console.log(_this.lifePoints);
          const temp = _this.lifePoints;
          _this.lifePoints-=object.hitPoints;
          object.hitPoints-=temp;
          console.log(_this.lifePoints);
          // console.log(object.hitTarget);
          if(_this.lifePoints <= 0) {
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
            if(drone) {
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
          console.log(_this.lifePoints);
          const temp = _this.lifePoints;
          _this.lifePoints-=object.hitPoints;
          object.hitPoints-=temp;
          console.log(_this.lifePoints);
          // console.log(object.hitTarget);
          if(_this.lifePoints <= 0) {
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            //a check for if the element has been deleted for any reason before this function could do it.
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
  function startGame() {
    startWaves();
    p1ScoreCount = 0;
    p2ScoreCount = 0;
    p1UpdateScore();
    p2UpdateScore();
    startPlayer1Life();
    if (player2Mode === true) {
      startPlayer2Life();
    }
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
