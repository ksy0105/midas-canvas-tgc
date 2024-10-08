import {initCanvasContext, makeCanvasContainer} from "../../utils.ts";

// 이미지 애니메이션 만들기
const execute3_13_1 = (containerId: string) => {
    const ctx = initCanvasContext(containerId, 1);

    const bgImage = new Image();
    bgImage.src = "space.png";

    let x = 0;

    setInterval(() => {
        ctx.drawImage(bgImage, x--, 0);

        if (x <= -600) {
            x = 0;
        }
    }, 30);
}

const execute3_13 = () => {
    const id = 'chapter3_13'

    makeCanvasContainer(id, '3.13. 백그라운드 이미지 애니메이션 만들기', () => {
        execute3_13_1(id);
    });
}

export default execute3_13;