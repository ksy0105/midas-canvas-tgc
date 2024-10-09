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

    move(dy: number, canvasHeight: number) {
        this.y = Math.min(this.y + dy, canvasHeight - this.height);
    }
}

class EnemyController {
    private enemies: Enemy[];
    private speed: number;
    private canvasHeight: number;

    constructor(enemies: Enemy[], speed: number, canvasHeight: number) {
        this.enemies = enemies;
        this.speed = speed;
        this.canvasHeight = canvasHeight;
    }

    public update(deltaTime: number) {
        const distance = this.speed * deltaTime; // 속도와 deltaTime을 곱하여 이동 거리 계산
        this.enemies.forEach(enemy => {
            enemy.move(distance, this.canvasHeight);
        });
    }

    public getEnemies() {
        return this.enemies;
    }
}


export default new CanvasExample(($canvas, ctx) => {
    let lastTime = 0;

    // 초기 설정 값들
    const ENEMY_SIZE = { width: 43, height: 61 };
    const ENEMY_INITIAL_POSITIONS = [{
        id: 'enemy1',
        x: 100,
        y: -70,
    }, {
        id: 'enemy2',
        x: 200,
        y: -70,
    }, {
        id: 'enemy3',
        x: 300,
        y: -70,
    }];

    // 게임 요소 생성
    const enemies = ENEMY_INITIAL_POSITIONS.map(enemy => new Enemy(enemy.x, enemy.y, ENEMY_SIZE.width, ENEMY_SIZE.height, '/EnemyFighter.png'));
    const enemyController = new EnemyController(enemies, 50, $canvas.height);

    // 게임 루프
    const animate = (currentTime: number) => {
        const deltaTime = (currentTime - lastTime) / 1000; // deltaTime을 초 단위로 계산
        lastTime = currentTime;

        ctx.clearRect(0, 0, $canvas.width, $canvas.height); // 화면 지우기

        // 적 그리기
        enemyController.update(deltaTime); // 적 위치 업데이트
        enemyController.getEnemies().forEach(enemy => enemy.render(ctx));

        requestAnimationFrame(animate); // 다음 프레임 요청
    };

    // 애니메이션 시작
    requestAnimationFrame(animate);
});