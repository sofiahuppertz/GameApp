
export class Paddle {
  #htmlElem;
  #speed;
  #coords;
  #keys;

  static #moves = {
    'w': () => move(board, 'up'),
    's': () => move(board, 'down'),
    'ArrowUp': () => move(board,'up'),
    'ArrowDown': () => move(board, 'down')
  };

  constructor (paddle, keyup, keydown, speed=0.1)
  {
    this.#htmlElem = paddle;
    this.#speed = speed;
    this.#keys = [keyup, keydown];
    this.#coords = this.#htmlElem.getBoundingClientRect();
  }

  move(board, direction)
  {
    const distance = window.innerHeight * this.#speed;
    const newTop = (direction === 'up') ? this.#coords.top - distance : this.#coords.top + distance;
    
    const newCoords = new DOMRect( // Dom rectangle
      this.#coords.left,
      newTop,
      this.#coords.width,
      this.#coords.height
    ); 

    if (board.isTouchingBorder(newCoords)) { return; }

    this.#htmlElem.style.top = newTop + 'px';
    this.#coords = this.#htmlElem.getBoundingClientRect();
  };

  setEventListener()
  {
    document.addEventListener('keydown', (event) => {
      for(let key of this.#keys)
      {
        if (event.key == key)
        {
          Paddle.#moves[event.key]();
          break;
        }
      }
    });
  };
}




// TODO: Make movement smoother
// TODO: Make sure both paddles can move at the same time