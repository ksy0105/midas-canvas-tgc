export class CanvasExample {
    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    callback: ($canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;

    constructor(callback: ($canvas:HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void) {
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = 400;
        this.$canvas.height = 300;
        this.ctx = this.$canvas.getContext('2d')!;
        this.callback = callback;
    }

    ready() {
        const $app = document.getElementById('app')!;
        $app.appendChild(this.$canvas);
        return this;
    }

    execute() {
        this.callback(this.$canvas, this.ctx);
    }
}