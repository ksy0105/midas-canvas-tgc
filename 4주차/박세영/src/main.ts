import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./global.config";
import { Background } from "./objects/Background";
import { Player } from "./objects/Player";

class Game {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  background: Background;
  player: Player;

  constructor() {
    this.$canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.$canvas.width = CANVAS_WIDTH;
    this.$canvas.height = CANVAS_HEIGHT;

    this.ctx = this.$canvas.getContext("2d")!;

    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.background.render();
    this.player.render();
  }
}

new Game();