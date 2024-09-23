// 선의 간격을 조정하여 점선 만들기

const ID = 'canvas3-1-4'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.lineWidth = 10

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineTo(300, 100)
ctx.setLineDash([20])
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 150)
ctx.lineTo(300, 150)
ctx.lineTo(300, 200)
ctx.setLineDash([20, 10])
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 250)
ctx.lineTo(300, 250)
ctx.lineTo(300, 300)
ctx.setLineDash([20, 10, 50, 10])
ctx.stroke()