// 글씨 크기를 크게 변경하기

const ID = 'canvas3-6-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = '#6495ED'
ctx.font = 'italic bold 28px Arial, sans-serif'
ctx.fillText('Hello World!', 50, 100)
