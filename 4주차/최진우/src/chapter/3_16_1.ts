import {initCanvas} from '../common.ts';

const draw3_16_1 = (subTitle: string, id: string, canvasId: string) => {
    const {ctx} = initCanvas(subTitle, id, canvasId);

    const buildings = [
        {id: 'Airport', x: 50, y: 50, w: 64, h: 64, sx: 0, sy: 0},
        {id: 'Bank', x: 150, y: 50, w: 64, h: 64, sx: 100, sy: 0},
        {id: 'CarRepair', x: 250, y: 50, w: 64, h: 64, sx: 200, sy: 0},
        {id: 'GasStation', x: 50, y: 150, w: 64, h: 64, sx: 300, sy: 0},
        {id: 'Hospital', x: 150, y: 150, w: 64, h: 64, sx: 400, sy: 0},
        {id: 'Temple', x: 250, y: 150, w: 64, h: 64, sx: 500, sy: 0},
    ];

    // 빌딩 이미지
    const buildingImg = new Image();
    buildingImg.src = 'src/images/buildings.png';

    // 배경 이미지
    const bgImg = new Image();
    bgImg.src = 'src/images/background.png';

    // 이미지를 캔버스에 그림
    buildingImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0);

        for (let i = 0; i < buildings.length; i++) {
            const sx = buildings[i]['sx'];
            const sy = buildings[i]['sy'];
            const sw = buildings[i]['w'];
            const sh = buildings[i]['h'];
            const dx = buildings[i]['x'];
            const dy = buildings[i]['y'];
            const dw = buildings[i]['w'];
            const dh = buildings[i]['h'];

            ctx.drawImage(buildingImg, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }

    // 마우스 클릭 이벤트
    document.getElementById(canvasId)!.addEventListener('click', (e: MouseEvent) => {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        for (let i = 0; i < buildings.length; i++) {
            const bData = buildings[i];

            // 마우스 좌표를 체크하여 빌딩의 이름을 가져옴
            if(mouseX >= bData.x &&
                mouseX <= bData.x + bData.w &&
                mouseY >= bData.y &&
                mouseY <= bData.y + bData.h) {
                console.log(bData['id']);

                // 캔버스에 선택한 건물명을 출력할 배경
                ctx.clearRect(100, 260, 200, 30);
                ctx.fillStyle = 'yellow';
                ctx.fillRect(100, 260, 200, 30);

                // 캔버스에 선택한 건물명을 출력
                ctx.fillStyle = 'red';
                ctx.textAlign = 'center';
                ctx.font = 'bold 20px Arial, sans-serif';
                ctx.fillText(bData.id, 200, 280);
            }
        }
    });
};

export default draw3_16_1;
