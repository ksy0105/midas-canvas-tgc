export default (options?: {
    width?: number,
    height?: number,
    style?: Partial<CSSStyleDeclaration>,
}): {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
} => {
    const id = 'id_'+Math.random().toString(36).slice(2)
    document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${id}" width="${options?.width ?? 400}" height="${options?.height || 300}"}></canvas>`)
    const canvas = document.querySelector<HTMLCanvasElement>(`#${id}`)!
    const ctx = canvas.getContext('2d')!
    if(options?.style) Object.assign(canvas.style, options.style);
    return {ctx, canvas}
}