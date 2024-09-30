import {initCanvasWrap} from '../common.ts';
import draw3_11_1 from './3_11_1.ts';

const draw3_11 = (title: string) => {
    initCanvasWrap(title)

    draw3_11_1('사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기', 'canvas3_11_1');
};

export default draw3_11;
