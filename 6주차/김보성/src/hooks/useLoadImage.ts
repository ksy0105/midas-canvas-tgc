import {useState} from "react";

export const useLoadImage = () => {
    // 이미지 로드 확인용
    const [isImgLoaded, setIsImgLoaded] = useState<boolean[]>([false, false, false, false, false]);
    const isCompleted = isImgLoaded.some(item => !item); // 모든 이미지 불러오기 완료

    const handleImageLoad = (idx: number) => {
        if(isImgLoaded[idx]) return;

        setIsImgLoaded([
            ...isImgLoaded.slice(0, idx),
            true,
            ...isImgLoaded.slice(idx + 1, isImgLoaded.length)
        ]);
    }

    const bgImg = new Image();
    bgImg.src = '/images/space.png';
    bgImg.onload = () => handleImageLoad(0);

    const fighterImg = new Image();
    fighterImg.src = '/images/fighter.png';
    fighterImg.onload = () => handleImageLoad(1);

    const laserImg = new Image();
    laserImg.src = '/images/laser.png';
    laserImg.onload = () => handleImageLoad(2);

    const asteroidImg = new Image();
    asteroidImg.src = '/images/asteroid.png';
    asteroidImg.onload = () => handleImageLoad(3);

    const explodeImg = new Image();
    explodeImg.src = '/images/explode.png';
    explodeImg.onload = () => handleImageLoad(4);

    return {
        isCompleted,
        bgImg, fighterImg, laserImg,
        asteroidImg, explodeImg
    }
}