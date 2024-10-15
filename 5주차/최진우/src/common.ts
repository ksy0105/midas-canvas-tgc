export const initCanvasWrap = (title: string, id: string) => {
    document.querySelector("#app")!.insertAdjacentHTML("beforeend", `<div class="wrap"><strong class="title">${title}</strong><div id="${id}" class="inner"></div></div>`);
};

export const initCanvas = (subTitle: string, id: string, canvasId: string) => {
    document.querySelector(`#${id}`)!.insertAdjacentHTML("beforeend", `<div class="box"><div class="desc">${subTitle}</div><canvas id="${canvasId}" class="canvas" width="400" height="300" tabindex="1"></canvas></div>`);
    const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!;
    const ctx = canvas.getContext('2d')!;

    return {canvas, ctx};
};

export const initAudioCanvas = (subTitle: string, id: string, canvasId: string, audioId: string) => {
    document.querySelector(`#${id}`)!.insertAdjacentHTML("beforeend",
        `<div class="box">
            <div class="desc">${subTitle}</div>
            <div class="audio_player">
                <canvas id="${canvasId}" class="canvas" width="400" height="100" tabindex="1"></canvas>
                <div id="${audioId}" class="audio_box"></div>
            </div>
        </div>`);
    const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!;
    const ctx = canvas.getContext('2d')!;

    return {canvas, ctx};
};
