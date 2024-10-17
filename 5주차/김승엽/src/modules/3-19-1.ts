import insertCanvas from "../insertCanvas.ts";

const {ctx, canvas} = insertCanvas()
const ctxW = canvas.width
const ctxH = canvas.height

const particles: {
    x: number
    y: number
    size: number
    vx: number
    vy: number
}[] = []
const totalCount = 30

const gravity = 1

function addParticle() {
    if(particles.length >= totalCount) return

    let x = ctxW / 2
    let y = ctxH / 4
    let size = 3

    let vx = Math.random() * 20 - 10
    let vy = Math.random() * 20 - 15

    particles.push({x, y, size, vx, vy})

}

function particle() {
    addParticle()

    particles.forEach((particle, i) => {
        ctx.beginPath()
        const grad = ctx.createLinearGradient(100, 0, 300, 0)
        grad.addColorStop(0, 'white')
        grad.addColorStop(0.25, 'yellow')
        grad.addColorStop(0.5, 'red')
        grad.addColorStop(0.75, 'yellow')
        grad.addColorStop(1, 'white')
        ctx.fillStyle = grad

        const x = particle.x += particle.vx
        const y = particle.y += particle.vy
        particle.vy += gravity
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        if (y > ctxH) {
            particles.splice(i, 1)
        }
    })
}

function animate() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, ctxW, ctxH)
    particle()
}

setInterval(animate, 30)
