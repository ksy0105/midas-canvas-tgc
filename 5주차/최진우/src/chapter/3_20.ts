import {initCanvasWrap} from '../common.ts';
// import draw3_20_1 from './3_20_1.ts';
// import draw3_20_2 from './3_20_2.ts';
import draw3_20_3 from './3_20_3.ts';

const draw3_20 = (title: string, id: string) => {
    initCanvasWrap(title, id)

    // draw3_20_1(`${id}_1\n오디오 태그에서 사운드가 제대로 재생되는지 확인하기`, id, `${id}_1`, `audio_${id}_1`);
    // draw3_20_2(`${id}_2\n음원을 분석하여 오디오바 만들기`, id, `${id}_2`, `audio_${id}_2`);
    draw3_20_3(`${id}_3\n그래프바를 그라데이션으로 바꾸고, 샘플링 수치 표시하기`, id, `${id}_3`, `audio_${id}_3`);
};

export default draw3_20;
