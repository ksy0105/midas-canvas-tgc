import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./global.config";
import { Background } from "./Objects/Background";
import { Fighter } from "./Objects/Fighter";

class Game {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  background: Background;
  fighter: Fighter;

  constructor() {
    this.$canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.$canvas.width = CANVAS_WIDTH;
    this.$canvas.height = CANVAS_HEIGHT;
    
    this.ctx = this.$canvas.getContext("2d")!;
    
    this.background = new Background(this.ctx);
    this.fighter = new Fighter(this.ctx);

    requestAnimationFrame(this.render.bind(this));
  }
  
  render() {
    requestAnimationFrame(this.render.bind(this));
    
    this.background.render();
    this.fighter.render();
  }
}

new Game();