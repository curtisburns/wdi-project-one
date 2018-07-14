window.onload = () => {

  let bulletCount = 0;
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
        console.log(playerX);
        player.style.left = playerX + 'px';
      }
    }
    // down
    if (e.key === 'ArrowDown') {
      if(playerY < 550) {
        playerY+=50;
        console.log(playerY);
        player.style.top = playerY + 'px';
      }
    }
    // left
    if (e.key === 'ArrowLeft') {
      if(playerX > 0) {
        playerX-=50;
        console.log(playerX);
        player.style.left = playerX + 'px';
      }
    }
    // up
    if (e.key === 'ArrowUp') {
      if(playerY > 0) {
        playerY-=50;
        console.log(playerY);
        player.style.top = playerY + 'px';
      }
    }
    //Current player coordinates
    console.log('X:' + playerX + ', Y: ' + playerY);
    /////////////////////////////////////////////////////////

    //************Shoot*******************///
    if (e.key === ' ') {
      console.log(e.key);
      shoot();
      //*1 showBullets();

    }
  }


  //////////////////////////////////////////////////


  ///////////////////Bullet mechanics////////////////
  function shoot() {
    const bulletX = playerX + 'px';
    const bulletY = playerY+25 + 'px';

    const bullet = document.createElement('div');
    bullet.setAttribute('style', 'top:' + bulletY +';' + 'left:' + bulletX +';');
    bullet.setAttribute('class', 'bullet');
    game.appendChild(bullet);
    travel(bullet);
    bulletCount++;
  }

  function travel(currentBullet) {
    console.log(parseInt(currentBullet.style.left));
    console.log(playerX + 'px');
    let travelX = playerX;
    const travelTime = setInterval(function () {
      if(travelX < 1000) {
        console.log(travelX);
        travelX+=50;
        currentBullet.style.left = travelX + 'px';
      } else {
        currentBullet.parentNode.removeChild(currentBullet);
        clearInterval(travelTime);
      }

    },50);
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
    },300);
  }





  Enemy.prototype.createEnemy = function() {
    const drone = document.createElement('div');
    drone.setAttribute('class',this.class);
    drone.setAttribute('style','left:'+ this.left + 'px; top:' + this.top + 'px;');
    game.appendChild(drone);
    this.enemyPath1(drone);
  };

  Enemy.prototype.enemyPath1 = function(drone) {
    console.log(drone.style.left);
    const movement = setInterval(function() {
      let enemyX = parseInt(drone.style.left);
      let enemyY = parseInt(drone.style.top);
      console.log(enemyX+' '+enemyY);

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
      } else (clearInterval(movement));
    },300);

  };



  wave1();













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
