export const getCtx = (selector: string) => {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    return canvas.getContext('2d')!;
}

export const makeCanvasContainer = (id: string, title: string) => {
    document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<h2>${title}</h2><div id=${id} class="canvas_container"></div>`)
}

export const makeCanvas = (containerId: string, canvasId: string) => {
    document.querySelector<HTMLDivElement>(`#${containerId}`)!.insertAdjacentHTML('beforeend', `<canvas id=${canvasId} width="400" height="300"></canvas>`)
}

export const initCanvasContext = (containerId: string, order: number) => {
    const id = getSubId(containerId, order);
    makeCanvas(containerId, id);
    return getCtx(`#${id}`);
}

export const getSubId = (id: string, order: number) => {
    return `${id}_${order}`;
}
