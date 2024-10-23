import {forwardRef} from "react";

const Lives = forwardRef<HTMLSpanElement>((_, ref) => {
    return (
        <div style={{
            position: "absolute",
            top: 20, left: 30,
            color: 'yellow', fontWeight: "bold"
        }}>
            {`LIVE `}<span ref={ref}/>
        </div>
    )
});

export default Lives;