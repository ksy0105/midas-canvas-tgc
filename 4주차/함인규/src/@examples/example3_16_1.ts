import {CanvasExample} from "../@model/CanvasExample.ts";

const BUILDINGS = [
    { id: "AirPort",   x:  50, y:  50, w: 64, h: 64, sx:   0, sy:   0 },
    { id: "Bank",      x: 150, y:  50, w: 64, h: 64, sx: 100, sy:   0 },
    { id: "CarRepair", x: 250, y:  50, w: 64, h: 64, sx: 200, sy:   0 },
    { id: "GasStation",x:  50, y: 150, w: 64, h: 64, sx: 300, sy:   0 },
    { id: "Hospital",  x: 150, y: 150, w: 64, h: 64, sx: 400, sy:   0 },
    { id: "Temple",    x: 250, y: 150, w: 64, h: 64, sx: 500, sy:   0 }
];

// 이미지 로드 완료를 Promise로 처리하는 함수
const loadImage = (src:string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
};

// 캔버스의 빌딩 이미지를 마우스로 클릭할 때 빌딩 이름 출력하기
export default new CanvasExample(async ($canvas, ctx) => {
    try {
        // 배경 이미지와 빌딩 이미지 로드
        const bgImg = await loadImage('/background.png');
        const buildingImg = await loadImage('/buildings.png');

        // 초기 렌더링
        const renderDefault = () => {
            // 배경 이미지 먼저 그리기
            ctx.drawImage(bgImg, 0, 0, $canvas.width, $canvas.height);

            // 빌딩 이미지 그리기
            BUILDINGS.forEach(building => {
                ctx.drawImage(
                    buildingImg,
                    building.sx, building.sy, building.w, building.h, // 원본 이미지에서 잘라낼 영역
                    building.x, building.y, building.w, building.h    // 캔버스에 그릴 영역
                );
            });
        }

        const showBuildingName = (name:string) => {
            const nameTagSize = {
                w: 200,
                h: 30
            }
            const nameTagPosition = {
                x: $canvas.width / 2 - nameTagSize.w / 2,
                y: 260,
            };

            // 캔버스에 선택한 건물명을 출력할 배경을 만든다.
            ctx.clearRect(nameTagPosition.x, nameTagPosition.y, nameTagSize.w, nameTagSize.h);
            ctx.fillStyle = 'yellow';
            ctx.fillRect(100, 260, 200, 30);

            // 건물명 출력
            ctx.fillStyle = '#6495ED';
            ctx.textAlign = 'center';
            ctx.textBaseline = "middle"
            ctx.font = 'bold 20px Arial, sans-serif';
            ctx.fillText(name, $canvas.width / 2, nameTagPosition.y + nameTagSize.h / 2);
        }

        $canvas.onclick = (e) => {
            const mouseX = e.offsetX; //마우스 클릭한 x좌표 (canvas 기준)
            const mouseY = e.offsetY; //마우스 클릭한 y좌표 (canvas 기준)

            // 클릭한 위치가 빌딩의 영역에 있는지 확인
            const clickedBuilding = BUILDINGS.find(b =>
                mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h
            );

            if(clickedBuilding) {
                showBuildingName(clickedBuilding.id);
            } else {
                renderDefault();
            }
        };

        renderDefault();
    } catch (error) {
        console.error("Failed to load one or more images", error);
    }
});
