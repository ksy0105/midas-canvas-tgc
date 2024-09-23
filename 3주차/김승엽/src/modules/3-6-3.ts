// 글씨의 외곽선 그리기

const ID = 'canvas3-6-3'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 40px Arial, sans-serif'
ctx.fillText('Hello World!', 10, 100)
ctx.lineWidth = 2
ctx.strokeText('Hello World!', 10, 100)
