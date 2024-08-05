/* Macros */
const speed = 0.1;
const paddleHeight = document.querySelector('.paddle').getBoundingClientRect().height;


function makeMove(paddle, coords, coordsBoard, speed, direction)
{
  if (direction == 'up')
  {
    paddle.style.top = 
      Math.max(coordsBoard.top, coords.top 
      - window.innerHeight * speed) + 'px';
  }
  else 
  {
    paddle.style.top = 
      Math.min(coordsBoard.bottom - paddleHeight,
      coords.top + window.innerHeight * speed) + 'px';
  }
  coords.top = paddle.getBoundingClientRect().top;
}

function movePaddles(board, paddle1, paddle2)
{
  /* Coordinates for elements */
  let coordsBoard = board.getBoundingClientRect();
  let coordsPaddle1 = { top: paddle1.getBoundingClientRect() };
  let coordsPaddle2 = { top: paddle2.getBoundingClientRect() };

  function handleKeyDown(e)
  {
    const keyActions = {
      'w': ()  => makeMove(paddle1, coordsPaddle1, coordsBoard, speed, 'up'),
      's': ()  => makeMove(paddle1, coordsPaddle1, coordsBoard, speed, 'down'),
      'ArrowUp': () => makeMove(paddle2, coordsPaddle2, coordsBoard, speed, 'up'),
      'ArrowDown': () => makeMove(paddle2, coordsPaddle2, coordsBoard, speed, 'down')
    }

    if (keyActions[e.key]) {
      keyActions[e.key]();
    }
  }
  document.addEventListener('keydown', handleKeyDown); 
}

export {paddleHeight, speed, movePaddles};


// TODO: Make movement smoother