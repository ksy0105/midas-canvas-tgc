import {initCanvasContext, loadImage, makeCanvasContainer} from "../../utils.ts";

// 캔버스의 빌딩 이미지를 마우스로 클릭할 때 빌딩 이름 출력하기
const execute3_16_1 = async (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const buildings = [
        {id: "AirPort", x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0},
        {id: "Bank", x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0},
        {id: "CarRepair", x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0},
        {id: "GasStation", x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0},
        {id: "Hospital", x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0},
        {id: "Temple", x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0},
    ]

    const [buildingImage, bgImage] = await Promise.all([
        loadImage("buildings.png"), loadImage("background.png")
    ])

    ctx.drawImage(bgImage, 0, 0);
    for (let i = 0; i < buildings.length; i++) {
        const sx = buildings[i]['sx'];
        const sy = buildings[i]['sy'];
        const sw = buildings[i]['w'];
        const sh = buildings[i]['h'];
        const dx = buildings[i]['x'];
        const dy = buildings[i]['y'];
        const dw = buildings[i]['w'];
        const dh = buildings[i]['h'];

        ctx.drawImage(buildingImage, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    ctx.canvas.addEventListener('mousedown', function (event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        for (let i = 0; i < buildings.length; i++) {
            const bData = buildings[i];

            if (mouseX >= bData.x && mouseX < bData.x + bData.w && mouseY >= bData.y && mouseY < bData.y + bData.h) {
                console.log(bData.id);

                ctx.clearRect(100, 260, 200, 30);
                ctx.fillStyle = "yellow";
                ctx.fillRect(100, 260, 200, 30);

                ctx.fillStyle = "#6495ED";
                ctx.textAlign = "center";
                ctx.font = "bold 20px Arial, sans-serif";
                ctx.fillText(bData.id, 200, 280);
            }
        }
    })
}

const execute3_16 = () => {
    const id = 'chapter3_16'

    makeCanvasContainer(id, '3.16. 마우스 충돌 체크하기', async () => {
        await execute3_16_1(id);
    });
}

export default execute3_16;