import { Direction, DIRECTION } from "../common/direction";
import { keyManager } from "../common/KeyManager/KeyManager";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../global.config";

export class Player {
  ctx;
  playerImage;
  speed = 3;

  x;
  y;
  w;
  h;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.playerImage = new Image();
    this.playerImage.src = "images/fighter.png";

    this.x = 30;
    this.y = CANVAS_HEIGHT / 2;
    this.w = this.playerImage.width;
    this.h = this.playerImage.height;
  }

  bind() {
    if (keyManager.isPressed("w")) 
      this.move.call(this, DIRECTION.UP)
    if (keyManager.isPressed("s")) 
      this.move.call(this, DIRECTION.DOWN)
    if (keyManager.isPressed("a"))
      this.move.call(this, DIRECTION.LEFT)
    if (keyManager.isPressed("d"))
      this.move.call(this, DIRECTION.RIGHT)
  }

  move(direction: Direction) {
    switch(direction) {
      case DIRECTION.UP:
        if(this.y < 0) return;
        this.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        if(this.y > CANVAS_HEIGHT - this.h) return;
        this.y += this.speed;
        break;
      case DIRECTION.LEFT:
        if(this.x < 0) return;
        this.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        if(this.x > CANVAS_WIDTH - this.w) return;
        this.x += this.speed;
        break;
    }
  }

  render() {
    this.bind.call(this);
    this.ctx.drawImage(this.playerImage, this.x, this.y);
  }
}
