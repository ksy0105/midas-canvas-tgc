const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const myPic = new Image();
myPic.src = "images/duck.jpg";
myPic.onload = function () {
    ctx.drawImage(myPic, 10, 10);
};
