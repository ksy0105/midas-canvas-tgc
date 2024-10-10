import {initCanvas} from '../common.ts';

const datas = [
    {
        value: 'source-over',
        desc: '이미지 위에 겹쳐 그림(default)'
    },
    {
        value: 'source-atop',
        desc: '첫번째 이미지를 그리고 두번째 이미지의 겹치는 부분만 그림'
    },
    {
        value: 'source-in',
        desc: '첫번째 이미지를 그리지 않고 그 영역 안에 두번째 이미지만 그림'
    },
    {
        value: 'source-out',
        desc: '첫번째 이미지를 그리지 않고 두번째 이미지의 겹치지 않는 부분만 그림'
    },
    {
        value: 'destination-over',
        desc: '첫번째 이미지를 위로 올려 그리고 두번째 이미지를 아래로 그림'
    },
    {
        value: 'destination-atop',
        desc: '첫번째 이미지를 위로 올려 겹치는 부분만 그리고 두번째 이미지 전체를 그림'
    },
    {
        value: 'destination-in',
        desc: '첫번째 이미지를 위로 올리고 두번째 이미지와 겹치는 부분만 그림'
    },
    {
        value: 'destination-out',
        desc: '첫번째 이미지만 그리고 두번째 이미지와 겹치는 부분을 지움'
    },
    {
        value: 'lighter',
        desc: '전체를 그리고 겹친 부분을 가산 혼합함'
    },
    {
        value: 'copy',
        desc: '두번째 이미지만 남기고 다른 부분은 제거'
    },
    {
        value: 'xor',
        desc: '전체를 그리고 겹친 부분을 지움'
    }
];

const draw = (subTitle: string, id: string, canvasId: string, index: number, value: any) => {
    const {ctx} = initCanvas(subTitle, id, `${canvasId}_${index+1}`);

    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 100, 100);
    ctx.globalCompositeOperation = value;
    ctx.fillStyle = 'blue';
    ctx.fillRect(50, 50, 100, 100);
}

const draw3_10_2 = (subTitle: string, id: string, canvasId: string) => {
    datas.map((data, index) => {
        draw(`${subTitle}: ${data.value}\n${data.desc}`, id, canvasId, index, data.value);
    });
};

export default draw3_10_2;
