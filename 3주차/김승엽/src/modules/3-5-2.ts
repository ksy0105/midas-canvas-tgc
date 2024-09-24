// 이미지의 크기를 변형하여 그리기

const ID = 'canvas3-5-2'

document.querySelector<HTMLDivElement>('#app')!.insertAdjacentHTML('beforeend', `<canvas id="${ID}" width="400" height="300"></canvas>`)
const canvas = document.querySelector<HTMLCanvasElement>(`#${ID}`)!
const ctx = canvas.getContext('2d')!

const iu = new Image()
iu.src = "image02.png"
iu.onload = () => {
    ctx.drawImage(iu, 10, 10, 150, 100)
}