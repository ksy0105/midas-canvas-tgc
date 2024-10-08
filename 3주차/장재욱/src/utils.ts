export const getCtx = (selector: string) => {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    return canvas.getContext('2d')!;
}

export const makeCanvasContainer = (id: string, title: string, callback: () => void, isFirst: boolean = false) => {
    document.querySelector<HTMLDivElement>('.side_bar')!.insertAdjacentHTML('beforeend', `<h4 id=${id}>${title}</h4>`)

    const titleElement = document.querySelector<HTMLDivElement>(`#${id}`);

    const clickCallback = () => {
        const container = document.querySelector<HTMLDivElement>(`.canvas_container`)!;
        const _title = document.querySelector<HTMLDivElement>(`.container h1`)!;
        const hasChildNodes = container.hasChildNodes();

        if (hasChildNodes) container.innerHTML = '';
        _title.innerText = title;
        callback();
    }

    if (isFirst) {
        clickCallback();
    }

    if (titleElement) {
        titleElement.addEventListener('click', clickCallback);
    }
}

export const makeCanvas = (canvasId: string) => {
    document.querySelector<HTMLDivElement>(`.canvas_container`)!.insertAdjacentHTML('beforeend', `<canvas id=${canvasId} width="400" height="300"></canvas>`)
}

export const initCanvasContext = (containerId: string, order: number) => {
    const id = getSubId(containerId, order);
    makeCanvas(id);
    return getCtx(`#${id}`);
}

export const getSubId = (id: string, order: number) => {
    return `${id}_${order}`;
}

export const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
}
