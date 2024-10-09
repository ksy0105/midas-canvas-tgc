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

// 플레이어 클래스
class Player extends GameObject {
    constructor(x: number, y: number, width: number, height: number, src: string) {
        super(x, y, width, height, src);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // 이동 메서드
    move(dx: number, dy: number, canvasWidth: number, canvasHeight: number) {
        this.x = Math.min(Math.max(this.x + dx, 0), canvasWidth - this.width);
        this.y = Math.min(Math.max(this.y + dy, 0), canvasHeight - this.height);
    }
}

// 키 입력 상태를 관리하는 컨트롤러 클래스
class PlayerController {
    private player: Player;
    private keys: Record<'W' | 'A' | 'S' | 'D' | ' ', boolean>;
    private speed: number;
    private canvasWidth: number;
    private canvasHeight: number;
    private bulletController: BulletController;


    constructor(player: Player, speed: number, canvasWidth: number, canvasHeight: number, bulletController: BulletController) {
        this.player = player;
        this.speed = speed;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.keys = { W: false, A: false, S: false, D: false, ' ': false };
        this.bulletController = bulletController;

        // 키 입력 이벤트 바인딩
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(e: KeyboardEvent) {

        const key = e.key.toUpperCase() as 'W' | 'A' | 'S' | 'D' | ' ';
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = true;
        }
    }

    private handleKeyUp(e: KeyboardEvent) {
        const key = e.key.toUpperCase() as 'W' | 'A' | 'S' | 'D' | ' ';
        if (this.keys.hasOwnProperty(key)) {
            this.keys[key] = false;
        }
    }

    // 플레이어 이동 업데이트
    private updatePlayerPosition(deltaTime: number) {
        let dx = 0;
        let dy = 0;
        const distance = this.speed * deltaTime; // 속도와 deltaTime을 곱하여 이동 거리 계산

        if (this.keys['A']) dx = -distance;
        if (this.keys['D']) dx = distance;
        if (this.keys['W']) dy = -distance;
        if (this.keys['S']) dy = distance;

        this.player.move(dx, dy, this.canvasWidth, this.canvasHeight);
    }

    // 총알 발사 처리 메서드
    private handleShooting() {
        if (this.keys[' ']) {
            this.bulletController.fireBullet(this.player.x + this.player.width / 2, this.player.y); // 플레이어의 위치를 기준으로 총알 발사
        }
    }

    // 모든 업데이트를 처리하는 메서드
    public update(deltaTime: number) {
        this.updatePlayerPosition(deltaTime); // 플레이어 이동 처리
        this.handleShooting(); // 총알 발사 처리
    }
}

// 탄환 클래스
class Bullet {
    private x: number;
    private y: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    isOutOfScreen() {
        return this.y < 0;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(dy: number) {
        this.y += dy;
    }
}

class BulletController {
    private bullets: Bullet[];
    private speed: number;
    private cooldownTime: number; // 발사 간격 (초 단위)
    private lastShootTime: number; // 마지막 발사 시점

    constructor(speed: number,  cooldownTime: number = 0.1) {
        this.bullets = [];
        this.speed = speed;
        this.cooldownTime = cooldownTime;
        this.lastShootTime = 0; // 초기값은 0
    }

    public fireBullet(x: number, y: number) {
        const currentTime = Date.now() / 1000; // 현재 시간을 초 단위로 변환

        // 쿨다운 시간이 지났는지 확인 후 총알 발사
        if (currentTime - this.lastShootTime >= this.cooldownTime) {
            const bullet = new Bullet(x, y - 5, 3, 10); // 탄환의 위치 및 크기 설정
            this.bullets.push(bullet);
            this.lastShootTime = currentTime; // 마지막 발사 시간 갱신
        }
    }

    public update(deltaTime: number) {
        this.bullets.forEach(bullet => {
            bullet.move(-this.speed * deltaTime);
        });

        //화면 밖으로 벗어난 총알 제거
        this.bullets = this.bullets.filter(bullet => !bullet.isOutOfScreen());
    }

    public renderBullets(ctx: CanvasRenderingContext2D) {
        this.bullets.forEach(bullet => {
            bullet.render(ctx);
        });
    }
}



export default new CanvasExample(($canvas, ctx) => {
    let lastTime = 0;

    // 초기 설정 값들
    const PLAYER_SPEED = 150;
    const PLAYER_SIZE = { width: 50, height: 45 };
    const INITIAL_PLAYER_POSITION = { x: $canvas.width * 0.5 - PLAYER_SIZE.width * 0.5, y: 250 };
    const BULLET_SPEED = 300; // 총알 속도 설정

    // 게임 요소 생성
    const player = new Player(INITIAL_PLAYER_POSITION.x, INITIAL_PLAYER_POSITION.y, PLAYER_SIZE.width, PLAYER_SIZE.height, '/BlueFighter.png');
    const bulletController = new BulletController(BULLET_SPEED);
    const playerController = new PlayerController(player, PLAYER_SPEED, $canvas.width, $canvas.height, bulletController);

    // 게임 루프
    const animate = (currentTime: number) => {
        const deltaTime = (currentTime - lastTime) / 1000; // deltaTime을 초 단위로 계산
        lastTime = currentTime;

        ctx.clearRect(0, 0, $canvas.width, $canvas.height); // 화면 지우기

        playerController.update(deltaTime); // 플레이어 위치 및 발사 업데이트
        bulletController.update(deltaTime); // 총알 이동 업데이트

        player.render(ctx); // 플레이어 그리기
        bulletController.renderBullets(ctx); // 총알 그리기

        requestAnimationFrame(animate); // 다음 프레임 요청
    };

    // 애니메이션 시작
    requestAnimationFrame(animate);
});