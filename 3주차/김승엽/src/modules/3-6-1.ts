// 글씨 그리기

const ID = 'canvas3-6-1'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 120, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 140, 100)
ctx.fillText('The fillText() method draws filled text on the canvas.', 50, 160, 100)
