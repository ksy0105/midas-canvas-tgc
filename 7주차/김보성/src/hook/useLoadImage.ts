import {useState} from "react";

export const useLoadImage = () => {
    // 이미지 로드 확인용
    const [isImgLoaded, setIsImgLoaded] = useState<boolean[]>([false, false]);
    const isCompleted = isImgLoaded.some(item => !item); // 모든 이미지 불러오기 완료

    const handleImageLoad = (idx: number) => {
        if(isImgLoaded[idx]) return;

        setIsImgLoaded([
            ...isImgLoaded.slice(0, idx),
            true,
            ...isImgLoaded.slice(idx + 1, isImgLoaded.length)
        ]);
    }

    const dotImg = new Image();
    dotImg.src = '/dottodot_airplane.png';
    dotImg.onload = () => handleImageLoad(0);

    const airplane_Img = new Image();
    airplane_Img.src = '/dottodot_airplane_finish.png';
    airplane_Img.onload = () => handleImageLoad(1);

    return {
        isCompleted,
        dotImg, airplane_Img,
    }
}