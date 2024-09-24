// 기본 원그리기

const ID = 'canvas3-3-1'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.arc(150, 150, 100, 0, Math.PI * 2)
ctx.stroke()