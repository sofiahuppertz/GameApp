import { paddleHeight, speed, movePaddles } from './paddles.js';
import { Board } from './board.js';
import { Ball } from './ball.js';

class Game {
  #ball;
  #board;
  #paddles;
  #panel

  constructor ()
}

function ballBoardIntersection(ball, board, panel) 
{
  if (board.isTouchingBorder(ball.getCoords())) 
  {
    if (someoneScored(ball, board, panel)) 
    {
      ball.resetBallPosition();
      return 1;
    }
    else 
    {
      ball.resetDirection();
    }
  }
  return 0;
}

function ballPaddleIntersection(ball, paddles) 
{
  if (paddles.isTouching(ball.getCoords())) 
  {
    ball.resetDirection();
    ball.setSlopes();
  }

}

function animateBall(ball, board, paddles, panel) 
{
  if (ballBoardIntersection(ball, board) != 0)
    return; // Someone scored...
  ballPaddleIntersection(ball, paddles);
  ball.move();
  requestAnimationFrame(() => moveBall(ball, board, paddle, panel));
  return 0;
}
