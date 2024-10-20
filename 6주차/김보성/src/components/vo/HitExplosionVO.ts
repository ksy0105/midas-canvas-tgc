interface IHitExplosionVO {
    x: number;
    y: number;
    isVisibleHit: boolean;
    randScale: number;
}

export default class HitExplosionVO {
    x: number = 0;
    y: number = 0;
    isVisibleHit: boolean = false; //이미지 표시 여부

    // 운석 크기 정보
    randScale: number = 0;

    constructor(vo?: IHitExplosionVO) {
        if(!vo) return;

        this.x = vo.x;
        this.y = vo.y;
        this.isVisibleHit = vo.isVisibleHit;
        this.randScale = vo.randScale;
    }

    setIsVisibleHit(isVisible: boolean) {
        this.isVisibleHit = isVisible;
    }
}