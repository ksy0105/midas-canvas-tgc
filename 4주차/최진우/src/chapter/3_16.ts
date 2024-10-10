import {initCanvasWrap} from '../common.ts';
import draw3_16_1 from './3_16_1.ts';

const draw3_16 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_16_1('캔버스의 빌딩 이미지를 마우스로 클릭할 때 빌딩 이름 출력하기', id, `${id}_1`);
};

export default draw3_16;
