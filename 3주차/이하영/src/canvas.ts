const drawline = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.stroke();
};

const drawRectbyline = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
};

const drawRectbylineFilled = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
  ctx.fill();
};

const drawRectbylineFilledRed = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
};

const drawRectbylineFilledRedStroke = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#0000ff";
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
};

const drawRectbylineFilledRedStrokeLineCap = (
  ctx: CanvasRenderingContext2D
) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#0000ff";
  ctx.lineCap = "round"; // butt, round, square
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
};

const drawRectbylineFilledRedStrokeLineJoin = (
  ctx: CanvasRenderingContext2D
) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  ctx.lineJoin = "bevel"; // miter, round, bevel
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#0000ff";
  ctx.lineCap = "square"; // butt, round, square
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fill();
};

const drawRectbylineFilledRedStrokeLineJoin_LineDash = (
  ctx: CanvasRenderingContext2D
) => {
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 50);
  // ctx.setLineDash([20]);

  // ctx.setLineDash([20, 10]);

  ctx.setLineDash([20, 10, 50, 10]);
  ctx.lineJoin = "round"; // miter, round, bevel
  ctx.lineWidth = 20;
  ctx.strokeStyle = "#0000ff";
  ctx.stroke();
};

const drawRect = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeRect(20, 20, 100, 100);
  ctx.strokeRect(150, 150, 50, 50);
};

const drawRectFilled = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "magenta";
  ctx.fillRect(20, 20, 100, 100);
  ctx.strokeRect(20, 20, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(150, 150, 50, 50);
  ctx.strokeRect(150, 150, 50, 50);
};

const drawRectclearbyRect = (ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";
  ctx.fillStyle = "blue";
  ctx.fillRect(50, 50, 200, 200);
  ctx.strokeRect(50, 50, 200, 200);
  ctx.clearRect(70, 70, 100, 50);
};

const drawArc = (ctx: CanvasRenderingContext2D) => {
  ctx.arc(150, 150, 100, 0, Math.PI * 2);
  ctx.stroke();
};

const drawRoundCorner = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(300, 50);
  ctx.arcTo(350, 50, 350, 100, 50);
  ctx.lineTo(350, 200);
  ctx.stroke();
};

const drawQuadraticCurve = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(300, 50);
  ctx.quadraticCurveTo(200, 100, 350, 100);
  ctx.lineTo(350, 200);
  ctx.stroke();
};

const drawBezierCurve = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(300, 50);
  ctx.bezierCurveTo(200, 70, 100, 150, 350, 100);
  ctx.lineTo(350, 200);
  ctx.stroke();
};

const drawFillGradient = (ctx: CanvasRenderingContext2D) => {
  var grad = ctx.createLinearGradient(50, 50, 250, 50);
  grad.addColorStop(0, "red");
  grad.addColorStop(1 / 6, "orange");
  grad.addColorStop(2 / 6, "yellow");
  grad.addColorStop(3 / 6, "green");
  grad.addColorStop(4 / 6, "aqua");
  grad.addColorStop(5 / 6, "blue");
  grad.addColorStop(1, "purple");
  ctx.lineWidth = 5;
  ctx.fillStyle = grad;
  ctx.fillRect(50, 50, 200, 200);
  ctx.strokeRect(50, 50, 200, 200);
};

const drawFillRadialGradient = (ctx: CanvasRenderingContext2D) => {
  var grad = ctx.createRadialGradient(0, 0, 0, 100, 100, 300);
  grad.addColorStop(0, "red");
  grad.addColorStop(0.5, "yellow");
  grad.addColorStop(1, "black");

  ctx.lineWidth = 5;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 300, 300);
  ctx.strokeRect(0, 0, 300, 300);
};

const drawFillPattern = (
  ctx: CanvasRenderingContext2D,
  element: HTMLCanvasElement
) => {
  var flower = new Image();
  flower.src = "images/flower.png";
  flower.onload = function () {
    var pattern = ctx.createPattern(flower, "repeat");
    if (pattern) {
      ctx.fillStyle = pattern;
    }
    ctx.fillRect(0, 0, element.width, element.height);
  };
};

const drawImageOriginalSize = (ctx: CanvasRenderingContext2D) => {
  var myPic = new Image();
  myPic.src = "images/flower.png";
  myPic.onload = function () {
    ctx.drawImage(myPic, 10, 10);
  };
};

const drawImageChangeSize = (ctx: CanvasRenderingContext2D) => {
  var myPic = new Image();
  myPic.src = "images/flower.png";
  myPic.onload = function () {
    ctx.drawImage(myPic, 10, 10, 150, 100);
  };
};

const drawImageCutSize = (ctx: CanvasRenderingContext2D) => {
  var myPic = new Image();
  myPic.src = "images/flower.png";
  myPic.onload = function () {
    ctx.drawImage(myPic, 20, 20, 200, 200, 10, 10, 300, 200);
  };
};

const drawLetter = (ctx: CanvasRenderingContext2D) => {
  ctx.fillText(
    "The fillText() method draws filled text on the canvas.",
    50,
    100
  );
  ctx.fillText(
    "The fillText() method draws filled text on the canvas.",
    50,
    120,
    100
  );
  ctx.fillText(
    "The fillText() method draws filled text on the canvas.",
    50,
    140,
    200
  );
  ctx.fillText(
    "The fillText() method draws filled text on the canvas.",
    50,
    160,
    300
  );
};

const drawLetterChangeFont = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#6495ED";
  ctx.font = "italic bold 28px Arial, sans-self";
  ctx.fillText("Hello Canvas World!", 50, 100);
};

const drawLetterOutline = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#6495ED";
  ctx.font = "italic bold 40px Arial, sans-self";
  ctx.fillText("Hello Canvas World!", 10, 100);
  ctx.lineWidth = 2;
  ctx.strokeText("Hello Canvas World!", 10, 200);
};

const drawLetterbyHorAlign = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#6495ED";
  ctx.font = "italic bold 30px Arial, sans-self";
  ctx.textAlign = "start";
  ctx.fillText("Hello World!", 200, 50);
  ctx.textAlign = "end";
  ctx.fillText("Hello World!", 200, 100);
  ctx.textAlign = "left";
  ctx.fillText("Hello World!", 200, 150);
  ctx.textAlign = "right";
  ctx.fillText("Hello World!", 200, 200);
  ctx.textAlign = "right";
  ctx.fillText("Hello World!", 200, 200);
  ctx.textAlign = "center";
  ctx.fillText("Hello World!", 200, 250);
  ctx.strokeStyle = "red";
  ctx.moveTo(200, 20);
  ctx.lineTo(200, 370);
  ctx.stroke();
};

const drawLetterbyVerAlign = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#6495ED";
  ctx.font = "italic bold 30px Arial, sans-self";
  ctx.textBaseline = "top";
  ctx.fillText("top!", 10, 150);
  ctx.textBaseline = "bottom";
  ctx.fillText("bottom!", 50, 150);
  ctx.textBaseline = "middle";
  ctx.fillText("middle!", 130, 150);
  ctx.textBaseline = "alphabetic";
  ctx.fillText("alphabetic!", 220, 150);
  ctx.textBaseline = "hanging";
  ctx.fillText("hanging!", 300, 150);
  ctx.strokeStyle = "red";
  ctx.moveTo(200, 20);
  ctx.lineTo(200, 370);
  ctx.stroke();
};

const drawRectShadow = (ctx: CanvasRenderingContext2D) => {
  ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 3;
  ctx.fillStyle = "red";
  ctx.fillRect(50, 50, 100, 100);
};

const drawRectChangePosition = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "green";
  ctx.fillRect(50, 50, 100, 100);
  ctx.translate(100, 100);
  ctx.fillRect(50, 50, 100, 100);
};

const drawRectChangeScale = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "green";
  ctx.fillRect(50, 50, 100, 100);
  ctx.scale(0.5, 0.5);
  ctx.fillStyle = "red";
  ctx.fillRect(50, 50, 100, 100);
};

const drawRectRotate = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.strokeRect(100, 100, 100, 100);
  ctx.fillRect(100, 100, 100, 100);
  ctx.rotate((5 * Math.PI) / 180);
  ctx.strokeRect(100, 100, 100, 100);
  ctx.fillRect(100, 100, 100, 100);
  ctx.rotate((5 * Math.PI) / 180);
  ctx.strokeRect(100, 100, 100, 100);
  ctx.fillRect(100, 100, 100, 100);
};

const drawRectTransform = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 100, 100);
  ctx.fillRect(0, 0, 100, 100);
  // 1.5배 확대
  // ctx.transform(1.5, 0, 0, 1.5, 100, 100);
  // 0.2 만큼 수평,수직으로 기울이기
  ctx.transform(1, 0.2, 0.2, 1, 100, 100);
  ctx.strokeRect(0, 0, 100, 100);
  ctx.fillRect(0, 0, 100, 100);
};

const drawRectTransformWithSetTransform = (ctx: CanvasRenderingContext2D) => {
  // ctx.fillStyle = "yellow";
  // ctx.strokeStyle = "blue";
  // ctx.lineWidth = 3;
  // ctx.strokeRect(0, 0, 100, 100);
  // ctx.fillRect(0, 0, 100, 100);
  // ctx.transform(1, 0.2, 0.2, 1, 100, 100);
  // ctx.fillStyle = "green";
  // ctx.fillRect(0, 0, 100, 100);
  // ctx.setTransform(1, 0, 0, 1, 100, 100);
  // ctx.fillStyle = "red";
  // ctx.fillRect(0, 0, 100, 100);

  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 100, 100);
  ctx.fillRect(0, 0, 100, 100);
  ctx.setTransform(1, 0.2, 0.2, 1, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 100, 100);
  ctx.transform(1, 0, 0, 1, 100, 100);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 100, 100);
};

const drawImageColorChange = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "red";
  ctx.fillRect(20, 30, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(50, 50, 100, 100);
  var src = ctx.getImageData(0, 0, 100, 100);
  ctx.putImageData(src, 200, 50);
  ctx.strokeRect(0, 0, 100, 100);
  ctx.strokeRect(200, 50, 100, 100);
};

const drawImageColorChangeBlack = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "red";
  ctx.fillRect(20, 30, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(50, 50, 100, 100);
  var src = ctx.getImageData(0, 0, 100, 100);
  var pixels = src.data;
  var numPixels = pixels.length;
  for (var i = 0; i < numPixels; i++) {
    var avg = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
    pixels[i * 4] = avg;
    pixels[i * 4 + 1] = avg;
    pixels[i * 4 + 2] = avg;
  }
  ctx.putImageData(src, 200, 50);
  ctx.strokeRect(0, 0, 100, 100);
  ctx.strokeRect(200, 50, 100, 100);
};

const drawImageColorReverse = (ctx: CanvasRenderingContext2D) => {
  var img = new Image();
  img.src = "images/flower.png";
  img.onload = function () {
    draw(img);
  };
  function draw(img: HTMLImageElement) {
    ctx.drawImage(img, 0, 0);
    var src = ctx.getImageData(0, 0, 100, 100);
    var datas = src.data;
    var numPixels = datas.length;

    for (var i = 0; i < numPixels; i += 4) {
      datas[i] = 255 - datas[i]; // red
      datas[i + 1] = 255 - datas[i + 1]; // green
      datas[i + 2] = 255 - datas[i + 2]; // blue
    }
    ctx.putImageData(src, 200, 50);
    ctx.strokeRect(0, 0, 100, 100);
    ctx.strokeRect(200, 50, 100, 100);
  }
};

export function setupCanvas(element: HTMLCanvasElement) {
  const ctx = element.getContext("2d")!;
  // 3.1
  // drawline(ctx);
  // drawRectbyline(ctx);
  // drawRectbylineFilled( ctx);
  // drawRectbylineFilledRed(ctx);
  // drawRectbylineFilledRedStroke( ctx);
  // drawRectbylineFilledRedStrokeLineCap( ctx);
  // drawRectbylineFilledRedStrokeLineJoin( ctx);
  // drawRectbylineFilledRedStrokeLineJoin_LineDash( ctx);

  // 3.2
  // drawRect( ctx);
  // drawRectFilled( ctx);
  // drawRectclearbyRect( ctx);

  // 3.3
  // drawArc( ctx);
  // drawRoundCorner(ctx);
  // drawQuadraticCurve(ctx);
  // drawBezierCurve(ctx);

  // 3.4
  // drawFillGradient(ctx);
  // drawFillRadialGradient(ctx);
  // drawFillPattern(ctx, element);

  // 3.5
  // drawImageOriginalSize(ctx);
  // drawImageChangeSize(ctx);
  // drawImageCutSize(ctx);

  // 3.6
  // drawLetter(ctx);
  // drawLetterChangeFont(ctx);
  // drawLetterOutline(ctx);
  // drawLetterbyHorAlign(ctx);
  // drawLetterbyVerAlign(ctx);

  // 3.7
  // drawRectShadow(ctx);

  // 3.8
  // drawRectChangePosition(ctx);
  // drawRectChangeScale(ctx);
  // drawRectRotate(ctx);
  // drawRectTransform(ctx);
  // drawRectTransformWithSetTransform(ctx);

  // 3.9
  // drawImageColorChange(ctx);
  // drawImageColorChangeBlack(ctx);
  drawImageColorReverse(ctx);
}
