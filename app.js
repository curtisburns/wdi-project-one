window.onload = () => {

  let playerRight = 0;
  let playerDown = 0;

  window.addEventListener('keydown', checkKeys, false);
  const player = document.getElementsByClassName('player')[0];
  function checkKeys(e) {
    //player.style.right;
    console.log('playerright is:  ' + playerRight);
    console.log('playerdown is: ' + playerDown);

    if (e.keyCode === 39) {
      playerRight+=50;
      console.log(playerRight);
      player.style.left = playerRight + 'px';
    }
    if (e.keyCode === 40) {
      playerDown+=50;
      console.log(playerDown);
      player.style.top = playerDown + 'px';
    }
    if (e.keyCode === 37) {

      playerRight-=50;
      console.log(playerRight);
      player.style.left = playerRight + 'px';
    }
    if (e.keyCode === 38) {
      if (playerDown<50) {
        playerDown-=50;
        console.log(playerDown);
        player.style.top = playerDown + 'px';
      }
    }
  }

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
