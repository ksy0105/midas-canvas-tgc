import {initCanvasWrap} from '../common.ts';
import draw3_19_1 from './3_19_1.ts';
import draw3_19_2 from './3_19_2.ts';
import draw3_19_3 from './3_19_3.ts';
import draw3_19_4 from './3_19_4.ts';
import draw3_19_5 from './3_19_5.ts';

const draw3_19 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_19_1(`${id}_1\n파티클의 불꽃 하나 만들기`, id, `${id}_1`);
    draw3_19_2(`${id}_2\n불꽃 파티클 움직이기`, id, `${id}_2`);
    draw3_19_3(`${id}_3\n원형에 초속도, 중력을 설정하여 튀는 모션 만들기`, id, `${id}_3`);
    draw3_19_4(`${id}_4\n불꽃 파티클을 여러 개 만들기`, id, `${id}_4`);
    draw3_19_5(`${id}_5\n불꽃 파티클에 그라데이션 넣기`, id, `${id}_5`);
};

export default draw3_19;
