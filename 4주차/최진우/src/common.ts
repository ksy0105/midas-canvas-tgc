export const initCanvasWrap = (title: string) => {
    document.querySelector("#app")!.insertAdjacentHTML("beforeend", `<div class="wrap"><strong class="title">${title}</strong><div class="inner"></div></div>`);
};

export const initCanvas = (subTitle: string, canvasId: string) => {
    document.querySelector('.inner')!.insertAdjacentHTML("beforeend", `<div class="box"><div class="desc">${subTitle}</div><canvas id="${canvasId}" class="canvas" width="400" height="300"></canvas></div>`);
    const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!;
    const ctx = canvas.getContext('2d')!;

    return {canvas, ctx};
};

// export const initCtx = (subTitle: string, canvasWrapId: string, canvasId: string) => {
//     initCanvas(subTitle, canvasWrapId, canvasId);
//     const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!;
//     const ctx = canvas.getContext('2d')!;
//
//     return {canvas, ctx};
// };
