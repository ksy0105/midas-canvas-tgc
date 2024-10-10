import {initCanvasWrap} from '../common.ts';
import draw3_15_1 from './3_15_1.ts';
import draw3_15_2 from './3_15_2.ts';

const draw3_15 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_15_1('JSON 객체를 배열로 처리하여 사각형을 캔버스에 그리기', id, `${id}_1`);
    draw3_15_2('JSON 객체를 배열로 처리하여 캔버스에 이미지 그리기', id, `${id}_2`);
};

export default draw3_15;
