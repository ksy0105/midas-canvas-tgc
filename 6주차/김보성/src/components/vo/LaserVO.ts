interface  ILaserVO {
    x: number;
    y: number;
}

export default class LaserVO {
    x: number;
    y: number;

    constructor(vo: ILaserVO) {
        this.x = vo.x;
        this.y = vo.y;
    }

    moveX() {
        this.x += 20;
    }
}