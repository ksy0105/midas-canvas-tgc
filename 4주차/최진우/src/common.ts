export const initCanvasWrap = (title: string, id: string) => {
    document.querySelector("#app")!.insertAdjacentHTML("beforeend", `<div class="wrap"><strong class="title">${title}</strong><div id="${id}" class="inner"></div></div>`);
};

export const initCanvas = (subTitle: string, id: string, canvasId: string) => {
    document.querySelector(`#${id}`)!.insertAdjacentHTML("beforeend", `<div class="box"><div class="desc">${subTitle}</div><canvas id="${canvasId}" class="canvas" width="400" height="400" tabindex="1"></canvas></div>`);
    const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!;
    const ctx = canvas.getContext('2d')!;

    return {canvas, ctx};
};
