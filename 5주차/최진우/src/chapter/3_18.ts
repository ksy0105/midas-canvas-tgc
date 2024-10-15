import {initCanvasWrap} from '../common.ts';
import draw3_18_1 from './3_18_1.ts';
import draw3_18_2 from './3_18_2.ts';
import draw3_18_3 from './3_18_3.ts';
import draw3_18_4 from './3_18_4.ts';
import draw3_18_5 from './3_18_5.ts';
import draw3_18_6 from './3_18_6.ts';

const draw3_18 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    draw3_18_1(`${id}_1\n겨울밤 이미지의 배경을 캔버스에 그리기`, id, `${id}_1`);
    draw3_18_2(`${id}_2\n화면에 눈송이 하나 그리기`, id, `${id}_2`);
    draw3_18_3(`${id}_3\n뉸송이가 내릴 위치인 x 좌표와 눈송이의 크기를 랜덤하게 바꾸기`, id, `${id}_3`);
    draw3_18_4(`${id}_4\n눈송이를 여러 개 만들어 화면에 내리게 만들기`, id, `${id}_4`);
    draw3_18_5(`${id}_5\n눈송이 낙하 속도를 조정하여 사실적으로 보이게 하기`, id, `${id}_5`);
    draw3_18_6(`${id}_6\n바람이 불면 옆으로 기울여서 눈송이가 날리는 효과 만들기`, id, `${id}_6`);
};

export default draw3_18;
