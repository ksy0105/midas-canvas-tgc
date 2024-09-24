export const getCtx = (selector: string) => {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    return canvas.getContext('2d')!;
}