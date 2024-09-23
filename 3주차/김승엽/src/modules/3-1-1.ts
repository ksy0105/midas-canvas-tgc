// 사각형 그리기

const ID = 'canvas3-1-1'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineTo(300, 200)
ctx.lineTo(100, 200)
ctx.lineTo(100, 50)
ctx.lineWidth = 20
ctx.strokeStyle = '#0000ff'
ctx.lineCap = 'square'
ctx.stroke()
ctx.fillStyle = 'red'
ctx.fill()