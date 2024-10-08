import insertCanvas from "../insertCanvas.ts";

const {ctx} = insertCanvas()

// 캔버스의 빌딩 이미지를 마우스로 클릭할 때 빌딩 이름 출력하기
const buildings = [
    {id: 'tree', x: 50, y: 100, w: 120, h: 200, sx: 26, sy: 100},
    {id: 'snowman', x: 200, y: 100, w: 80, h: 150, sx: 745, sy: 750},
]

const img = new Image()
img.src = "image03.webp"

img.onload = () => {
    for (let i = 0; i < buildings.length; i++) {
        const b = buildings[i]
        const sx = b.sx
        const sy = b.sy
        const sw = b.w
        const sh = b.h
        const dx = b.x
        const dy = b.y
        const dw = b.w
        const dh = b.h
        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    }
}

document.addEventListener('mousedown', e => {
    const x = e.clientX - ctx.canvas.offsetLeft
    const y = e.clientY - ctx.canvas.offsetTop

    for (let i = 0; i < buildings.length; i++) {
        const b = buildings[i]

        if(x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) {
            ctx.clearRect(100, 260, 200, 30)
            ctx.fillStyle = 'yellow'
            ctx.fillRect(100, 260, 200, 30)

            ctx.fillStyle = '#6495ED'
            ctx.textAlign = 'center'
            ctx.font = 'bold 20px Arial, sans-serif'
            ctx.fillText(b.id, 200, 280)
        }
    }
})