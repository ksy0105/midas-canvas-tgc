export default function getContext(id) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', id);
    canvas.setAttribute('width', '400');
    canvas.setAttribute('height', '300');
    canvas.setAttribute('style', 'border: 1px solid black;');
    canvas.textContent = 'CANVAS를 지원하지 않습니다.';
    document.querySelector('#app').append(canvas);
    return canvas.getContext('2d');
};