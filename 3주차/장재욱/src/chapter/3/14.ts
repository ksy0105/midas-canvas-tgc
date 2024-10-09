import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 3.13절에서 만든 배경에 이어서 비행기 만들어보기
const execute3_14_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const bgImage = new Image();
    bgImage.src = "space.png";

    const fighterImage = new Image();
    fighterImage.src = "fighter.png";

    let x = 0;

    const SPEED = 5 as const;
    let keyCodeValue: 'W' | 'S' | 'A' | 'D' | null = null;

    setInterval(() => {
        ctx.drawImage(bgImage, x--, 0);

        if (x <= -600) {
            x = 0;
        }
    }, 30);

    class Background {
        x: number;
        y: number;
        w: number;
        h: number;

        constructor() {
            this.x = 0;
            this.y = 0;
            this.w = bgImage.width;
            this.h = bgImage.height;
        }

        render() {
            ctx.drawImage(bgImage, this.x--, 0);
            if (this.x <= -600) {
                this.x = 0;
            }
        }
    }

    class Player {
        x: number;
        y: number;
        w: number;
        h: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
            this.w = fighterImage.width;
            this.h = fighterImage.height;
        }

        render() {
            ctx.drawImage(fighterImage, this.x, this.y);
        }
    }

    const background = new Background();
    const player = new Player(30, 150);

    function update() {
        switch (keyCodeValue) {
            case "W":
                player.y -= SPEED;
                break;
            case "S":
                player.y += SPEED;
                break;
            case "A":
                player.x -= SPEED;
                break;
            case "D":
                player.x += SPEED;
                break;
        }
    }

    document.addEventListener('keydown', (event) => {
        const key = String.fromCharCode(event.keyCode);
        if (key === "W" || key === "S" || key === "A" || key === "D") keyCodeValue = key;
    })

    document.addEventListener('keyup', () => {
        keyCodeValue = null;
    })

    function animate() {
        background.render();
        player.render();
        update();
    }

    setInterval(animate, 30);
}

const execute3_14 = () => {
    const id = 'chapter3_14'

    makeCanvasContainer(id, '3.14. 이미지를 키보드로 움직이기', () => {
        execute3_14_1(id);
    });
}

export default execute3_14;