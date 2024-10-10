import {initCanvasWrap} from '../common.ts';
import draw3_13_1 from './3_13_1.ts';

const draw3_13 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_13_1('이미지 애니메이션 만들기', id, `${id}_1`);
};

export default draw3_13;
