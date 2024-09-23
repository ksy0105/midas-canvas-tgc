// 내부가 채워진 사각형 그리기

const ID = 'canvas3-2-1'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = 'megenta'
ctx.fillRect(20, 20, 100, 100)
ctx.strokeRect(20, 20, 100, 100)
ctx.fillStyle = 'green'
ctx.fillRect(150, 150, 50, 50)
ctx.strokeRect(150, 150, 50, 50)