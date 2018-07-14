window.onload = () => {
//
//   let bulletCount = 0;
//   let bulletXmin;
//   let bulletXmax;
//   let bulletYmin;
//   let bulletYmax;
//   //////////////////////////Movement//////////////////////
//   //this has to match the styling for the 'player' class
  const player = document.getElementsByClassName('player')[0];
  const game = document.getElementsByClassName('game')[0];
  let playerX = parseInt(player.style.left);
  let playerY = parseInt(player.style.top);
  const enemiesInPlay = [];
  const bulletsInPlay = [];
  let bulletId = 0;
  let enemyId = 0;
//   //////////////////////////////////////////////////////
  window.addEventListener('keydown', checkKeys);

  function checkKeys(e) {

    // right
    if (e.key === 'ArrowRight') {
      if(playerX < 950) {
        playerX+=50;
        // console.log(playerX);
        player.style.left = playerX + 'px';
      }
    }
    // down
    if (e.key === 'ArrowDown') {
      if(playerY < 550) {
        playerY+=50;
        // console.log(playerY);
        player.style.top = playerY + 'px';
      }
    }
    // left
    if (e.key === 'ArrowLeft') {
      if(playerX > 0) {
        playerX-=50;
        // console.log(playerX);
        player.style.left = playerX + 'px';
      }
    }
    // up
    if (e.key === 'ArrowUp') {
      if(playerY > 0) {
        playerY-=50;
        // console.log(playerY);
        player.style.top = playerY + 'px';
      }
    }
    //Current player coordinates
    // console.log('X:' + playerX + ', Y: ' + playerY);
    /////////////////////////////////////////////////////////

    //************Shoot*******************///
    if (e.key === ' ') {
      // console.log(e.key);
      shoot();
      //*1 showBullets();

    }
  }
//
//
//   //////////////////////////////////////////////////
//
//
//   ///////////////////Bullet mechanics////////////////
  function BulletsInPlay(xPos,yPos,id) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.id = id
  }

  function shoot() {
    const bulletX = playerX;
    const bulletY = playerY+15;
    const fire = new BulletsInPlay(bulletX,bulletY,bulletId);
    bulletsInPlay.push(fire);
    const index = bulletsInPlay.length-1;
    bulletsInPlay[index].createBullet();
  }

  BulletsInPlay.prototype.createBullet = function() {
    bulletId +=1;
    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    bullet.setAttribute('class', 'bullet');
    game.appendChild(bullet);
    this.travel(bullet);
    console.log(bulletsInPlay);
  };

  BulletsInPlay.prototype.travel = function(currentBullet) {
    const _this = this;
    console.log(bulletsInPlay.indexOf(_this))
    const travelTime = setInterval(function () {
      if(_this.xPos < 1000) {
        _this.xPos+=50;
        currentBullet.style.left = _this.xPos +'px';
      } else {
        currentBullet.parentNode.removeChild(currentBullet);
        console.log(bulletsInPlay.indexOf(_this));
        bulletsInPlay.forEach(object => {
          if (object.id === _this.id) {
            bulletsInPlay.splice(bulletsInPlay.indexOf(_this),1);
          }
        });
        clearInterval(travelTime);
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
    this.id = id
  }

//can setnumber of enemies as a variable at the top if needs be later.
  function startWave() {
    wave1(8);
  // wave2();
  // wave3();
  }

  function wave1(numberOfEnemies) {
    const enemyX = 1000;
    const enemyY = -50;
    let i = numberOfEnemies;
    const release = setInterval(function() {
      if(i > 0) {
        i-=1;
        const birthedEnemy = new Enemy('wave1', enemyX, enemyY, enemyId);
        enemiesInPlay.push(birthedEnemy);
        const index = enemiesInPlay.length-1;
        enemiesInPlay[index].createEnemy();
      } else {
        clearInterval(release);
      }
    },1000);
  }

  Enemy.prototype.createEnemy = function() {
    enemyId +=1;
    const drone = document.createElement('div');
    drone.setAttribute('style', 'top:' + this.yPos +'px;' + 'left:' + this.xPos +'px;');
    drone.setAttribute('class', this.class);
    game.appendChild(drone);
    // console.log(this);
    this.travel(drone);
    this.collisionDetect(drone);
  };



  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.
  Enemy.prototype.travel = function(drone) {
    console.log(enemiesInPlay);
    const _this = this;
    const movement = setInterval(function() {
      if(_this.yPos <550 && _this.xPos > 400) {
        _this.xPos -= 50;
        _this.yPos += 50;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if (_this.yPos >0 && _this.xPos > -50) {
        _this.xPos -= 50;
        _this.yPos -= 50;
        drone.style.left = _this.xPos + 'px';
        drone.style.top = _this.yPos + 'px';
      } else if(game.children.length > 1) {
        drone.parentNode.removeChild(drone);
        enemiesInPlay.forEach(object => {
          if (object.id === _this.id) {
            // console.log(enemiesInPlay);
            enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
            clearInterval(movement);
          }
        });
      }
    },500);
  };

  Enemy.prototype.collisionDetect = function(drone) {
    const _this = this;
    const detect = setInterval(function() {
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
      bulletsInPlay.forEach(object => {
        if(object.xPos <= xMax && object.xPos + 50 >= xMin && object.yPos <= yMax && object.yPos + 10 >= yMin ) {
          drone.parentNode.removeChild(drone);
          bulletsInPlay.splice(bulletsInPlay.indexOf(object),1);
          console.log(object);
          console.log(indexOf(object));
          enemiesInPlay.splice(enemiesInPlay.indexOf(_this),1);
          clearInterval(detect);
        }
      });
    },200);
    // same rate at which bullet travels so every 'frame' is checked
  };
//
//
//
//
startWave();
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
