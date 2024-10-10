import {initCanvasWrap} from '../common.ts';
import draw3_11_1 from './3_11_1.ts';
import draw3_11_2 from './3_11_2.ts';

const draw3_11 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_11_1('사각형을 x축으로 왼쪽에서 오른쪽으로 움직이기', id, `${id}_1`);
    draw3_11_2('두 개의 사각형을 만들고 애니메이션을 멈추게 하기', id, `${id}_2`);
};

export default draw3_11;
