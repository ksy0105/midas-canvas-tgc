const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = 'images/duck.jpg';
img.onload = function() {
    draw(this);
};

function draw (img) {
    ctx.drawImage(img, 0, 0);
    const src = ctx.getImageData(0, 0, 100, 100);
    const datas = src.data;
    const numPixels = datas.length;

    for (let i = 0; i < numPixels; i += 4) {
        datas[i]     = 255 - datas[i];     // red
        datas[i + 1] = 255 - datas[i + 1]; // green
        datas[i + 2] = 255 - datas[i + 2]; // blue
    }

    ctx.putImageData(src, 200, 50);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(200, 50, 100, 100);
}
