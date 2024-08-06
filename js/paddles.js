
function makeMove(paddle, coords, board, speed, direction)
{
  if (direction == 'up')
  {
    paddle.style.top = 
      Math.max(board.getTop(), coords.top 
      - window.innerHeight * speed) + 'px';
  }
  else 
  {
    paddle.style.top = 
      Math.min(board.getBottom() - paddleHeight,
      coords.top + window.innerHeight * speed) + 'px';
  }
  coords.top = paddle.getBoundingClientRect().top;
}

function movePaddles(board, paddle1, paddle2)
{
  /* Coordinates for elements */
  let coordsPaddle1 = { top: paddle1.getBoundingClientRect() };
  let coordsPaddle2 = { top: paddle2.getBoundingClientRect() };

  function handleKeyDown(e)
  {
    const keyActions = {
      'w': ()  => makeMove(paddle1, coordsPaddle1, board, speed, 'up'),
      's': ()  => makeMove(paddle1, coordsPaddle1, board, speed, 'down'),
      'ArrowUp': () => makeMove(paddle2, coordsPaddle2, board, speed, 'up'),
      'ArrowDown': () => makeMove(paddle2, coordsPaddle2, board, speed, 'down')
    }

    if (keyActions[e.key]) {
      keyActions[e.key]();
    }
  }
  document.addEventListener('keydown', handleKeyDown); 
}

export {paddleHeight, speed, movePaddles};


// TODO: Make movement smoother
// TODO: Make sure both paddles can move at the same time