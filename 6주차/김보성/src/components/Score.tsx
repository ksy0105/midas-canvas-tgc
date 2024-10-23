import {forwardRef} from "react";

const Score = forwardRef<HTMLSpanElement>((_, ref) => {
    return (
        <div style={{
            position: "absolute",
            top: 20,
            left: '50%',
            transform:' translate(-50%, 0)',
            color: 'white', fontWeight: "bold"
        }}>
            {`SCORE `}<span ref={ref}/>
        </div>
    )
});

export default Score;