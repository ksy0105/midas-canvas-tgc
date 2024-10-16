import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 겨울밤 이미지의 배경을 캔버스에 그리기
const execute3_18_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);
    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    function animate() {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
    }

    setInterval(animate, 30);
}

// 화면에 눈송이 하나 그리기
const execute3_18_2 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 2);
    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    let y = 0;

    function snow() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(100, y++, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
        snow();
    }

    setInterval(animate, 30);
}

// 눈송이가 내릴 위치인 x좌표와 눈송이의 크기를 랜덤하게 바꾸기
const execute3_18_3 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 3);
    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    let x = Math.floor(Math.random() * ctxW) + 1;
    let y = 0;
    let size = Math.floor(Math.random() * 3) + 1;

    function snow() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(x, y++, size, 0, Math.PI * 2);
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
        snow();
    }

    setInterval(animate, 30);
}

// 눈송이를 여러 개 만들어 화면에 내리게 만들기
const execute3_18_4 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 4);
    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    type SnowType = {
        x: number;
        y: number;
        size: number;
    }

    const snowflakes:SnowType[] = [];
    let totalCount = 10;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    function addSnowflake() {
        if (snowflakes.length >= totalCount) return;

        const x = Math.floor(Math.random() * ctxW) + 1;
        const y = 0;

        const size = Math.floor(Math.random() * 3) + 1;

        snowflakes.push({x, y, size});
    }

    function snow() {
        addSnowflake();

        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

        for (let i in snowflakes) {
            ctx.beginPath();
            ctx.arc(snowflakes[i].x, snowflakes[i].y++, snowflakes[i].size, 0, Math.PI * 2);
            ctx.fill();

            if (snowflakes[i].y > ctxH) {
                snowflakes.splice(Number(i), 1);
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
        snow();
    }

    setInterval(animate, 30);
}

// 눈송이 낙하 속도 조정하여 사실적으로 보이게 하기
const execute3_18_5 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 5);
    const ctxW = ctx.canvas.width;
    const ctxH = ctx.canvas.height;

    type SnowType = {
        x: number;
        y: number;
        size: number;
    }

    const snowflakes:SnowType[] = [];
    let totalCount = 300;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    function addSnowflake() {
        if (snowflakes.length >= totalCount) return;

        const x = Math.floor(Math.random() * ctxW) + 1;
        const y = 0;

        const size = Math.floor(Math.random() * 3) + 1;

        snowflakes.push({x, y, size});
    }

    function snow() {
        addSnowflake();

        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

        for (let i in snowflakes) {
            ctx.beginPath();
            const ty = snowflakes[i].y += snowflakes[i].size * 0.5;
            ctx.arc(snowflakes[i].x, ty, snowflakes[i].size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            if (snowflakes[i].y > ctxH) {
                snowflakes.splice(Number(i), 1);
            }
        }
    }

    function displayCount() {
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial, sans-serif";
        ctx.fillText(String(snowflakes.length), 10, 20);
    }

    function animate() {
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
        snow();
        displayCount();
    }

    setInterval(animate, 30);
}

// 바람이 불면 옆으로 기울여서 눈송이가 날리는 효과 만들기
const execute3_18_6 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 6);
    const ctxW = ctx.canvas.width + 100;
    const ctxH = ctx.canvas.height + 100;

    type SnowType = {
        x: number;
        y: number;
        size: number;
    }

    const snowflakes:SnowType[] = [];
    let totalCount = 300;

    const bgImage = new Image();
    bgImage.src = "winternight.jpg";

    function addSnowflake() {
        if (snowflakes.length >= totalCount) return;

        const x = Math.floor(Math.random() * ctxW) - 100;
        const y = 0;

        const size = Math.floor(Math.random() * 3) + 1;

        snowflakes.push({x, y, size});
    }

    function snow() {
        addSnowflake();

        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";

        for (let i in snowflakes) {
            ctx.beginPath();
            const ty = snowflakes[i].y += snowflakes[i].size * 0.5;
            ctx.arc(snowflakes[i].x, ty, snowflakes[i].size * 0.5, 0, Math.PI * 2);
            ctx.fill();

            if (snowflakes[i].y > ctxH) {
                snowflakes.splice(Number(i), 1);
            }
        }
    }

    function displayCount() {
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial, sans-serif";
        ctx.fillText(String(snowflakes.length), 10, 20);
    }

    function animate() {
        ctx.save();
        ctx.clearRect(0, 0, ctxW, ctxH);
        ctx.drawImage(bgImage, 0, 0);
        displayCount();
        ctx.rotate(-0.2);
        snow();
        ctx.restore();
    }

    setInterval(animate, 30);
}

const execute3_18 = () => {
    const id = 'chapter3_18'

    makeCanvasContainer(id, '3.18. 파티클 만들기', () => {
        execute3_18_1(id);
        execute3_18_2(id);
        execute3_18_3(id);
        execute3_18_4(id);
        execute3_18_5(id);
        execute3_18_6(id);
    });
}

export default execute3_18;