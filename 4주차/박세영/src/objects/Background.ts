import { CANVAS_WIDTH } from "../global.config";

export class Background {
  x = 0;
  ctx;
  bgImage;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.bgImage = new Image();
    this.bgImage.src = "images/space.png";
  }
  
  render() {
    this.x -= 1;
    if (this.x <= -CANVAS_WIDTH) this.x = 0;
    this.ctx.drawImage(this.bgImage, this.x, 0);
    this.ctx.drawImage(this.bgImage, this.x + CANVAS_WIDTH, 0);
  }
}