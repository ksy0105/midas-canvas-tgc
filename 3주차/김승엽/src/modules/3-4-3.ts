// 패턴으로 사각형 내부 채우기

const ID = 'canvas3-4-3'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

const iu = new Image()
iu.src = "image01.png"
iu.onload = () => {
    const pattern = ctx.createPattern(iu, 'repeat')!
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}