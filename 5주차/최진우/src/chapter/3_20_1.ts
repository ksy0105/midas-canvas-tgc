import {initAudioCanvas} from '../common.ts';

const draw3_20_1 = (subTitle: string, id: string, canvasId: string, audioId: string) => {
    const {} = initAudioCanvas(subTitle, id, canvasId, audioId);

    const audio = new Audio();
    audio.src = 'src/sounds/nutcracker.mp3';
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    document.querySelector(`#${audioId}`)!.appendChild(audio);
};

export default draw3_20_1;
