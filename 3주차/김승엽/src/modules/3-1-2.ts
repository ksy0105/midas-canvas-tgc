// 선의 세 가지 끝부분 처리 방법 알아보기

const ID = 'canvas3-1-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.lineWidth = 20
ctx.strokeStyle = '#0000ff'

ctx.beginPath()
ctx.moveTo(100, 50)
ctx.lineTo(300, 50)
ctx.lineCap = 'butt'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 100)
ctx.lineTo(300, 100)
ctx.lineCap = 'round'
ctx.stroke()

ctx.beginPath()
ctx.moveTo(100, 150)
ctx.lineTo(300, 150)
ctx.lineCap = 'square'
ctx.stroke()