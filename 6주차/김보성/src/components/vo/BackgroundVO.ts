interface IBackgroundVO {
    x: number;
    y: number;
    ctxW: number;
    ctxH : number;
}

export default class BackgroundVO {
    x: number;
    y: number;
    ctxW: number;
    ctxH : number;

    constructor(vo: IBackgroundVO) {
        this.x = vo.x;
        this.y = vo.y;
        this.ctxW = vo.ctxW;
        this.ctxH = vo.ctxH;
    }

    moveX() {
        this.x = this.x - 1;

        if(this.x <= -this.ctxW) {
            this.x = 0;
        }
    }
}