interface IFighterVO {
    x: number;
    y: number;
    speed: number;
    ctxW: number;
    ctxH : number;
}

export default class FighterVO {
    x: number;
    y: number;
    speed: number;
    ctxW: number;
    ctxH : number;
    fighterExplosion: boolean = false;

    constructor(vo: IFighterVO) {
        this.x = vo.x;
        this.y = vo.y;
        this.speed = vo.speed;
        this.ctxW = vo.ctxW;
        this.ctxH = vo.ctxH;
    }

    moveX() {
        this.x += 10;
    }

    setFighterExplosion(bool: boolean) {
        this.fighterExplosion = bool;
    }

    reset() {
        this.x = 0;
        this.y = this.ctxH / 2;
    }

    update = (code: string) =>{
        // 키보드 키에 따른 비행기 좌표 변경
        switch (code) {
            case  'w':
                this.y -= this.speed;
                break;
            case  's':
                this.y += this.speed;
                break;
            case  'a':
                this.x -= this.speed;
                break;
            case  'd':
                this.x += this.speed;
                break;
        }
        // 비행기가 화면 밖으로 안나가도록 조건 처리
        if(this.x <= 0) {
            this.x = 0;
        }
        if(this.x >= this.ctxW - 60) {
            this.x = this.ctxW - 60;
        }
        if(this.y <= 0) {
            this.y = 0;
        }
        if(this.y >= this.ctxH - 30) {
            this.y = this.ctxH - 30;
        }

        return {x: this.x, y: this.y};
    }
}