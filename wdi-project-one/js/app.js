window.onload = () => {

  let bulletCount = 0;
  let bulletXmin;
  let bulletXmax;
  let bulletYmin;
  let bulletYmax;
  //////////////////////////Movement//////////////////////
  //this has to match the styling for the 'player' class
  let playerX = 0;
  let playerY = 250;
  //////////////////////////////////////////////////////
  window.addEventListener('keydown', checkKeys);
  const player = document.getElementsByClassName('player')[0];
  const game = document.getElementsByClassName('game')[0];

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


  //////////////////////////////////////////////////


  ///////////////////Bullet mechanics////////////////
  function shoot() {
    const bulletX = playerX + 'px';
    const bulletY = playerY+15 + 'px';

    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + bulletY +';' + 'left:' + bulletX +';');
    bullet.setAttribute('class', 'bullet');
    game.appendChild(bullet);
    travel(bullet);
    bulletCount++;
  }

  function travel(currentBullet) {
    // console.log(parseInt(currentBullet.style.left));
    // console.log(playerX + 'px');
    let travelX = playerX;
    const travelTime = setInterval(function () {
      if(travelX < 1000) {
        bulletXmin = parseInt(currentBullet.style.left);
        bulletXmax = parseInt(currentBullet.style.left) + currentBullet.offsetWidth;
        bulletYmin = parseInt(currentBullet.style.top);
        bulletYmax = parseInt(currentBullet.style.top) + currentBullet.offsetHeight;

        // console.log(travelX);
        travelX+=50;
        currentBullet.style.left = travelX + 'px';
      } else {
        currentBullet.parentNode.removeChild(currentBullet);
        clearInterval(travelTime);
      }


    },200);
  }

  ////////////////////////////////////////////////
  ///must use the same parameters for the x and y position in order for collision to work.
  // //////////////enemy creation////////////////////
  function Enemy(enemyClass, xPos, yPos) {
    this.class = enemyClass;
    this.left = xPos;
    this.top = yPos;
  }

  // Number of enemys in wave 1: 8//

  const wave1Enemies = [];
  const enemyNo = 8;

  function wave1() {
    for (let i=0; i < enemyNo; i++ ) {
      wave1Enemies[i] = new Enemy('wave1', 1000, -50);
      // console.log(wave1Enemies);
    }
    let j = 0;
    const startEnemyWave = setInterval(function() {
      if (j<8) {
        wave1Enemies[j].createEnemy();
        // console.log(wave1Enemies[j]);
        j+=1;
      } else {
        clearInterval(startEnemyWave);

      }
    },1000);
  }





  Enemy.prototype.createEnemy = function() {
    const drone = document.createElement('div');
    drone.setAttribute('class',this.class);
    drone.setAttribute('style','left:'+ this.left + 'px; top:' + this.top + 'px;');
    game.appendChild(drone);
    this.enemyPath1(drone);
    this.collisionDetect(drone);
  };
  //Below needs to be applied to the created enemy belonging to that object,
  //so invoke on creation.
  Enemy.prototype.enemyPath1 = function(drone) {
    // console.log(drone.style.left);
    const movement = setInterval(function() {
      let enemyX = parseInt(drone.style.left);
      let enemyY = parseInt(drone.style.top);
      // console.log(enemyX+' '+enemyY);

      if(enemyY <550 && enemyX > 400) {
        enemyX -= 50;
        enemyY += 50;
        drone.style.left = enemyX + 'px';
        drone.style.top = enemyY + 'px';
      } else if (enemyY > 0 && enemyX > -50){
        enemyX -= 50;
        enemyY -= 50;
        drone.style.left = enemyX + 'px';
        drone.style.top = enemyY + 'px';

        // can initiate sounds here
        // need to add collision detection - nested if statement? New function
        //passing drone as argument.
      } else {
        drone.parentNode.removeChild(drone);
        clearInterval(movement);
      }
    },1000);

  };

  wave1();

  Enemy.prototype.collisionDetect = function(drone) {
    const detect = setInterval(function() {
      // console.log(drone.offsetWidth);
      const Xmin = parseInt(drone.style.left);
      const Xmax = parseInt(drone.style.left) + drone.offsetWidth;
      const Ymin = parseInt(drone.style.top);
      const Ymax = parseInt(drone.style.top) + drone.offsetHeight;
      console.log('bulletYmin:' + bulletYmin);
      // console.log('droneYmin: ' + Ymin);
      console.log('bulletYmin:' + bulletYmax);
      // console.log('droneYmax: ' + Ymax);
      console.log(game.children.length)
      if (bulletXmax >= Xmin && bulletYmin <= Ymax && bulletYmin >= Ymin) {
        drone.parentNode.removeChild(drone);
      }
      if (game.children.length <= 1) {
        clearInterval(detect);
      }
    },200);
    // same rate at which bullet travels so every 'frame' is checked
  };












  ////////////////Follow cursor attempt/////////////////////////
  // const player = document.getElementsByClassName('player')[0];
  // const center = document.getElementsByClassName('center')[0];
  // center.addEventListener('click', activateDrag);
  //
  // function drag(event) {
  //   const mousex = event.clientX;
  //   const mousey = event.clientY;
  //   console.log(mousey);
  //   console.log(mousex);
  //   player.style.bottom = mousey + 'px';
  //   player.style.left = mousex + 'px';
  // }
  //
  //
  // function activateDrag(e) {
  //   player.addEventListener('mouseover', drag);
  //   drag(e);
  // }

};
