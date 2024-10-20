export interface IAsteroidVO {
    x: number;
    y: number;
    speed: number;
    ctxW: number;
    ctxH : number;
}

const arrScale = [0.4, 0.6,0.8, 1];

export default class AsteroidVO {
    x: number = 0;
    y: number = 0;
    speed: number = 0;
    ctxW: number = 0;
    ctxH : number = 0;


    //크기, 각도 정보
    randScale: number = 0;
    ang = 0; // 각도 조절용 (rotate)

    constructor(vo: IAsteroidVO) {
        this.x = vo.x;
        this.y = vo.y;
        this.speed = vo.speed;
        this.ctxW = vo.ctxW;
        this.ctxH = vo.ctxH;

        this.reset();
    }

    setAng(num : number) {
        this.ang += num;
    }

    moveX() {
        this.x -= this.speed;
    }

    reset() {
        this.speed = Math.floor(Math.random() * 5) + 5;
        this.x = this.ctxW;
        this.y = Math.floor(Math.random() * 350);

        if(this.y < 40) {
            this.y = 40;
        }
        if(this.y > 360) {
            this.y = 360;
        }

        this.randScale = this.shuffle(arrScale);
    }

    shuffle(arr: number[]) {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand];
    }
}