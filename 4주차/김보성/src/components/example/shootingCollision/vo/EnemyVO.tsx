interface IEnemyVO {
    id: string;
    x: number;
    y: number;
}

export default class EnemyListVO {
    img: HTMLImageElement;
    w: number = 43;
    h: number = 61;
    enemies: IEnemyVO[] = [];

    constructor() {
        this.img = new Image();
        this.img.src = 'EnemyFighter.png';
        this.enemies = [
            {id: 'enemy1', x: 100, y: -70},
            {id: 'enemy2', x: 200, y: -70},
            {id: 'enemy3', x: 300, y: -70},
        ]
    }

    render(ctx: CanvasRenderingContext2D, speed: number = 0.5) {
        this.enemies.forEach(item => {
            const enemyY = item.y += speed;
            ctx.drawImage(this.img, item.x, enemyY);
        });
    }
}