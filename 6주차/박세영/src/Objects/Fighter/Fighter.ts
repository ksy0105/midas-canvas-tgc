import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../global.config";
import { BoundingBox } from "../../Common/BoundingBox";
import { Position } from "../../Common/Position";
import { keyManager } from "../../Common/KeyManager/KeyManager";
import { Direction, DIRECTION } from "../../Common/direction";
import { Laser } from "./Laser";
import {
  COOL_DOWN_TIME,
  INITIAL_POSITION,
  INITIAL_SPEED,
} from "./fighter.config";

export class Fighter {
  ctx;
  img;
  speed = INITIAL_SPEED;
  coolDownTime = COOL_DOWN_TIME;
  isCoolDown = false;

  boundingBox: BoundingBox;

  lasers: Laser[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = "images/fighter.png";

    this.boundingBox = new BoundingBox(
      INITIAL_POSITION.x,
      INITIAL_POSITION.y,
      this.img.width,
      this.img.height
    );
  }

  controller() {
    if (keyManager.isPressed("w")) this.move(DIRECTION.UP);
    if (keyManager.isPressed("s")) this.move(DIRECTION.DOWN);
    if (keyManager.isPressed("a")) this.move(DIRECTION.LEFT);
    if (keyManager.isPressed("d")) this.move(DIRECTION.RIGHT);

    if (keyManager.isPressed(" ")) this.shoot();
  }

  move(direction: Direction) {
    switch (direction) {
      case DIRECTION.UP:
        if (this.boundingBox.y < 0) return;
        this.boundingBox.y -= this.speed;
        break;
      case DIRECTION.DOWN:
        if (this.boundingBox.y > CANVAS_HEIGHT - this.boundingBox.height)
          return;
        this.boundingBox.y += this.speed;
        break;
      case DIRECTION.LEFT:
        if (this.boundingBox.x < 0) return;
        this.boundingBox.x -= this.speed;
        break;
      case DIRECTION.RIGHT:
        if (this.boundingBox.x > CANVAS_WIDTH - this.boundingBox.width) return;
        this.boundingBox.x += this.speed;
        break;
    }
  }

  shoot() {
    if (this.isCoolDown) return;

    this.lasers.push(
      new Laser(
        this.ctx,
        new Position(
          this.boundingBox.x + this.boundingBox.width,
          this.boundingBox.y + this.boundingBox.height / 2
        )
      )
    );
    this.isCoolDown = true;

    setTimeout(() => {
      this.isCoolDown = false;
    }, this.coolDownTime);
  }

  render() {
    this.controller.call(this);

    this.ctx.drawImage(this.img, this.boundingBox.x, this.boundingBox.y);
    this.lasers = this.lasers.filter(
      (laser) => laser.boundingBox.x < CANVAS_WIDTH
    );
    this.lasers.forEach((laser) => laser.render());
  }
}
