import { CanvasExample } from "../@model/CanvasExample.ts";

// 추상 클래스: 공통 속성 및 메서드를 정의
abstract class GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    img: HTMLImageElement;

    constructor(x: number, y: number, width: number, height: number, src: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
    }

    // 하위 클래스에서 구현해야 할 렌더링 메서드
    abstract render(ctx: CanvasRenderingContext2D): void;
}

// 적 클래스
class Enemy extends GameObject {
    constructor(x: number, y: number, width: number, height: number, src: string) {
        super(x, y, width, height, src);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}


export default new CanvasExample(($canvas, ctx) => {

    // 초기 설정 값들
    const ENEMY_SIZE = { width: 43, height: 61 };
    const ENEMY_INITIAL_POSITIONS = [{
        id: 'enemy1',
        x: 100,
        y: 10,
    }, {
        id: 'enemy2',
        x: 200,
        y: 10,
    }, {
        id: 'enemy3',
        x: 300,
        y: 10,
    }];

    // 게임 요소 생성
    const enemies = ENEMY_INITIAL_POSITIONS.map(enemy => new Enemy(enemy.x, enemy.y, ENEMY_SIZE.width, ENEMY_SIZE.height, '/EnemyFighter.png'));

    // 게임 루프
    const animate = () => {
        ctx.clearRect(0, 0, $canvas.width, $canvas.height); // 화면 지우기

        // 적 그리기
        enemies.forEach(enemy => enemy.render(ctx));

        requestAnimationFrame(animate); // 다음 프레임 요청
    };

    // 애니메이션 시작
    requestAnimationFrame(animate);
});