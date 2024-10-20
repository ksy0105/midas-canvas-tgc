import {useEffect} from "react";

export const useKeydownEvent = (onEvent: (code: string) => void) => {
    useEffect(() => {
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            onEvent(e.key);
        });

        return () => {
            window.removeEventListener('keydown', (e: KeyboardEvent) => {
                onEvent(e.key);
            })
        }
    }, []);
}