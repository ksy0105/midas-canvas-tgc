export default (id: string): {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
} => {
    document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${id}" width="400" height="300"></canvas>`)
    const canvas = document.querySelector<HTMLCanvasElement>(`#${id}`)!
    const ctx = canvas.getContext('2d')!
    return {ctx, canvas}
}