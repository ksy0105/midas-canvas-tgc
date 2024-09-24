// 선과 호를 연결하여 라운드 코너 그리기

const ID = 'canvas3-3-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.beginPath()
ctx.moveTo(50, 50)
ctx.lineTo(300, 50)
ctx.arcTo(350, 50, 350, 100, 50)
ctx.lineTo(350, 200)
ctx.stroke()