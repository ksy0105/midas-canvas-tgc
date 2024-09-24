// radial gradient로 사각형 내부 채우기

const ID = 'canvas3-4-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

const grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300)
grad.addColorStop(0/2, 'red')
grad.addColorStop(1/2, 'yellow')
grad.addColorStop(2/2, 'black')

ctx.lineWidth = 5
ctx.fillStyle = grad
ctx.fillRect(0, 0, 300, 300)
ctx.strokeRect(0, 0, 300, 300)