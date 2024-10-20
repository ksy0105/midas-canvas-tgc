import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./global.config";
import { Asteroid } from "./Objects/Asteroid";
import { Background } from "./Objects/Background";
import { Fighter } from "./Objects/Fighter/Fighter";

class Game {
  $canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  background: Background;
  fighter: Fighter;
  asteroid: Asteroid;
  asteroids: Asteroid[] = [];

  isGameOver: boolean = false;

  constructor() {
    this.$canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.$canvas.width = CANVAS_WIDTH;
    this.$canvas.height = CANVAS_HEIGHT;

    this.ctx = this.$canvas.getContext("2d")!;

    this.background = new Background(this.ctx);
    this.fighter = new Fighter(this.ctx);
    this.asteroid = new Asteroid(this.ctx, { x: 400, y: 100 });
    this.asteroids.push(this.asteroid);

    requestAnimationFrame(this.render.bind(this));
  }

  render() {
    requestAnimationFrame(this.render.bind(this));

    this.collisionDetection();
    if (this.isGameOver) {
      this.handleGameOver();
      return;
    }

    this.background.render();
    this.fighter.render();
    this.asteroids.forEach((asteroid) => asteroid.render());
  }

  collisionDetection() {
    if (
      this.asteroids.some((asteroid) =>
        this.fighter.boundingBox.isCollideWith(asteroid.boundingBox)
      )
    ) {
      this.isGameOver = true;
    }

    this.asteroids.forEach((asteroid, i) => {
      this.fighter.lasers.forEach((laser) => {
        if (laser.boundingBox.isCollideWith(asteroid.boundingBox)) {
          this.asteroids.splice(i, 1);
        }
      });
    });
  }

  handleGameOver() {
    if (this.isGameOver) {
      this.ctx.font = "40px Arial";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Game Over", 300, CANVAS_HEIGHT / 2);
    }
  }
}

new Game();
