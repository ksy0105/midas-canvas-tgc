import {initCanvasWrap} from '../common.ts';
import draw3_17_1 from './3_17_1.ts';
import draw3_17_2 from './3_17_2.ts';
import draw3_17_3 from './3_17_3.ts';
import draw3_17_4 from './3_17_4.ts';

const draw3_17 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_17_1('비행기를 화면 하단에 배치하여 좌우로 움직임 구현하기', id, `${id}_1`);
    draw3_17_2('미사일 발사하기', id, `${id}_2`);
    draw3_17_3('적기 구현, 이동시키기', id, `${id}_3`);
    draw3_17_4('미사일과 적기의 충돌 처리하기1, 2', id, `${id}_4`);
};

export default draw3_17;
