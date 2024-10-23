import {FC, useState} from 'react';

interface Props {
    isGameOver: boolean;
    onReStart: () => void;
}

const GameOVer: FC<Props> = ({isGameOver, onReStart}) => {
    const [isHover, setIsHover] = useState(false);
    if(!isGameOver) return null;

    return (
        <div style={{
            position: "absolute",
            top: '50%', left: '50%',
            transform:' translate(-50%, -50%)',
        }}>
            <div style={{fontWeight: "bold", fontSize: 30, color: '#FF7F00'}}>GAME OVER</div>
            <a role={'button'} onClick={onReStart}
               style={{cursor: "pointer", display: "block", fontSize: 20, textAlign: 'center', marginTop: 10, color: isHover? 'blue' : '#FF7F00' }}
               onMouseOver={() => setIsHover(true)}
               onMouseLeave={() => setIsHover(false)}
            >
               reStart
            </a>
        </div>

    )
}

export default GameOVer