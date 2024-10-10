import {initCanvasWrap} from '../common.ts';
import draw3_12_1 from './3_12_1.ts';
import draw3_12_2 from './3_12_2.ts';

const draw3_12 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_12_1('마우스로 클릭한 곳의 좌표 얻기', id, `${id}_1`);
    draw3_12_2('마우스로 클릭한 곳에 사각형 그리기', id, `${id}_2`);
};

export default draw3_12;
