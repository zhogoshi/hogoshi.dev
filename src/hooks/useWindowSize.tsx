import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState(() => {
        if (typeof window === "undefined") {
            return {
                width: Number.POSITIVE_INFINITY,
                height: Number.POSITIVE_INFINITY
            };
        }
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    });
    useEffect(() => {
        const onResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])
    return size;
}