import EnemyListVO from "./EnemyVO.tsx";

interface IMissileVO {
    x: number;
    y: number;
    w: number;
    h: number;
}

export class MissileVO {
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;
    bg: string = 'red';

    constructor(vo: IMissileVO) {
        this.x = vo.x;
        this.y = vo.y;
        this.w = vo.w;
        this.h = vo.h;
    }
}

export default class PlayerVO {
    img: HTMLImageElement;
    x: number = 0;
    y: number = 450;
    w: number = 50;
    h: number = 45;

    missiles: MissileVO[] = [];

    constructor(vo?: PlayerVO) {
        if(vo) {
            this.img = vo.img;
            this.x = vo.x;
            this.y = vo.y;
            this.w = vo.w;
            this.h = vo.h;
        } else {
            this.img = new Image();
            this.img.src = 'BlueFighter.png';
        }

    }

    init(canW: number) {
        this.x = canW ? canW * 0.5 -25: 0;
    }

    render(ctx: CanvasRenderingContext2D, enemyList: EnemyListVO) {
        ctx.drawImage(this.img,this.x, this.y);

        this.missiles.forEach((item, idx) => {
            ctx.fillStyle = item.bg;
            ctx.fillRect(item.x, item.y -= 5, item.w, item.h);

            this.checkCollision(item, idx, enemyList);

            // 화면에서 삭제
            if(item.y <= 0) {
                this.missiles.splice(idx, 1);
            }
        })
    }

    checkCollision(missile:MissileVO, idx: number, enemyList: EnemyListVO) {
        enemyList.enemies.forEach((item, i) => {
           if(missile.x >= item.x && missile.x <= item.x + enemyList.w &&
            missile.y >= item.y && missile.y <= item.y + enemyList.h
           ) {
               this.missiles.splice(idx, 1);
               enemyList.enemies.splice(i, 1)
           }
        });
    }
}