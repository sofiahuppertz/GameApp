import { Board } from './board.js';
import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Panel } from './panel.js';

export class Game {
  #panel
  #board;
  #paddles;
  #ball;

  constructor ()
  {
    this.#panel = new Panel();
    this.#board = new Board(document.querySelector('.board'));
    this.#paddles = [
      new Paddle(document.querySelector('.paddle1'), 'w', 's'),
      new Paddle(document.querySelector('.paddle2'), 'ArrowUp', 'ArrowDown')
    ];
    this.#ball = new Ball(document.querySelector('.ball'));
  }

  startGame()
  {
    this.#panel.changeMessage('Press Enter To Play');
    document.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') 
      {
        this.#panel.changeMessage('Game Started');
        this.#animatePaddles();
        if (this.#animateBall() == 1)
        {
          this.startGame();
        }
      }
    });
  }

  /* Intersection functions and game logic */

  #someoneScored()
  {
    if (this.#ball.getCoords().left <= this.#board.getLeft())
    {
      panel.boostScore(1);
      panel.changeMessage('Player 2 scored!');
      return 1;
    }
    else if (this.#ball.getCoords().right >= this.#board.getRight())
    {
      panel.boostScore(0);
      panel.changeMessage('Player 1 scored!');
      return 1;
    }
    return 0;
  }

  #ballBoardIntersection() 
  {
    if (this.#board.isTouchingBorder(this.#ball.getCoords())) 
    {
      if (this.#someoneScored(this.#ball, this.#board, this.#panel)) 
      {
        this.#ball.resetBallPosition();
        return 1;
      }
      else 
      {
        this.#ball.resetDirection();
      }
    }
    return 0;
  }

  #ballPaddleIntersection() 
  {
    if (this.#paddles.isTouching(this.#ball.getCoords())) 
    {
      this.#ball.resetDirection();
      this.#ball.setSlopes();
    }

  }

  /* Object Animation functions */

  #animateBall() 
  {
    if (this.#ballBoardIntersection(this.#ball, this.#board) != 0)
      return 1; // Someone scored...
    this.#ballPaddleIntersection(this.#ball, this.#paddles);
    this.#ball.move();
    requestAnimationFrame(() => this.#animateBall(this.#ball, this.#board, this.#paddles, this.#panel));
    return 0;
  }

  #animatePaddles()
  {
    for (let paddle in this.#paddles)
    {
      paddle.setEventListener();
    }
  }
};
