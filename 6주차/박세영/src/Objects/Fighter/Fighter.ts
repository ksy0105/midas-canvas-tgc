import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../global.config";
import { BoundingBox } from "../../Common/BoundingBox";
import { Position } from "../../Common/Position";
import { keyManager } from "../../Common/KeyManager/KeyManager";
import { Direction, DIRECTION } from "../../Common/direction";
import { Laser } from "./Laser";
import { COOL_DOWN_TIME, INITIAL_POSITION, INITIAL_SPEED } from "./fighter.config";


export class Fighter {
  ctx;
  img;
  speed = INITIAL_SPEED;
  coolDownTime = COOL_DOWN_TIME;
  isCoolDown = false;

  point: Position;
  boundingBox: BoundingBox;

  lasers: Laser[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/fighter.png";

    this.point = new Position(INITIAL_POSITION.x, INITIAL_POSITION.y);
    this.boundingBox = new BoundingBox(this.img.width, this.img.height);
  }

  controller() {
      if (keyManager.isPressed("w")) 
        this.move.call(this, DIRECTION.UP)
      if (keyManager.isPressed("s")) 
        this.move.call(this, DIRECTION.DOWN)
      if (keyManager.isPressed("a"))
        this.move.call(this, DIRECTION.LEFT)
      if (keyManager.isPressed("d"))
        this.move.call(this, DIRECTION.RIGHT)

      if (keyManager.isPressed(" "))
        this.shoot.call(this);
  }

  move(direction: Direction) {
    switch(direction) {
      case DIRECTION.UP:
        if(this.point.y < 0) return;
        this.point.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        if(this.point.y > CANVAS_HEIGHT - this.boundingBox.height) return;
        this.point.y += this.speed;
        break;
      case DIRECTION.LEFT:
        if(this.point.x < 0) return;
        this.point.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        if(this.point.x > CANVAS_WIDTH - this.boundingBox.width) return;
        this.point.x += this.speed;
        break;
    }
  }

  shoot() {
    if(this.isCoolDown) return;

    this.lasers.push(
      new Laser(this.ctx, new Position(
        this.point.x + this.boundingBox.width, 
        this.point.y + this.boundingBox.height / 2
      ))
    );
    this.isCoolDown = true;

    setTimeout(() => {
      this.isCoolDown = false;
    }, this.coolDownTime);
  }

  render() {
    this.controller.call(this);

    this.ctx.drawImage(this.img, this.point.x, this.point.y);
    this.lasers.forEach(lazer => lazer.render());
  }
}