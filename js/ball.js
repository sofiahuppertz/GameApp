
export class Ball {

  #htmlElement;
  #speed;
  #slope_x;
  #slope_y;
  #direction_x;
  #direction_y;
  #coords;

  constructor (ball, speed=3, pprint=false)
  {
    this.#speed = speed;
    this.setSlopes();
    this.#direction_x =  Math.floor(Math.random() * 2); // 0 or 1
    this.#direction_y = Math.floor(Math.random() * 2); // 0 or 1
    this.#coords = ball.getBoundingClientRect();
    this.#htmlElement = ball;
    if (pprint) {
      console.log(this.#coords);
    }
  }

  setSlopes() {
    const angle = Math.random() * 2 * Math.PI;
    this.#slope_x = this.#speed * Math.cos(angle);
    this.#slope_y = this.#speed * Math.sin(angle);
  }

  getCoords() {
    return this.#coords;
  }

  resetDirection () {
    if (this.direction_x == 0) {
      this.direction_x = 1;
    }
  }

  resetBallPosition() {
    this.move(1);
  }

  move(middle=false) {

    if (middle) {
      this.#htmlElement.style.top = 'calc(50% - 20px)';
      this.#htmlElement.style.left = 'calc(50% - 20px)';
    }
    else {
      this.#htmlElement.style.top = coords.top + speedY * (dirY == 0 ? -1 : 1) + 'px';
      this.#htmlElement.style.left = coords.left + speedX * (dirX == 0 ? -1 : 1) + 'px';
    }
    this.#coords = this.#htmlElement.getBoundingClientRect();
  }

}


