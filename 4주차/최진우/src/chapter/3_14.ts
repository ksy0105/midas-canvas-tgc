import {initCanvasWrap} from '../common.ts';
import draw3_14_1 from './3_14_1.ts';
import draw3_14_2 from './3_14_2.ts';

const draw3_14 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_14_1('3.13에서 만든 배경에 이어서 player 만들어보기', id, `${id}_1`);
    draw3_14_2('키보드를 눌렀을 때 player가 움직이도록 하기', id, `${id}_2`);
};

export default draw3_14;
