import {initCanvasWrap} from '../common.ts';
import draw3_10_1 from './3_10_1.ts';
import draw3_10_2 from './3_10_2.ts';

const draw3_10 = (title: string) => {
    initCanvasWrap(title)

    draw3_10_1('알파값 적용하기', 'canvas3_10_1');
    draw3_10_2('두 개의 이미지를 합성하여 그리기', 'canvas3_10_2');
};

export default draw3_10;
