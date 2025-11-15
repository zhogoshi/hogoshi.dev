import { useEffect, useState } from "react"

export const useMobile = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const pointerCoarse = window.matchMedia('(pointer: coarse)');
        const anyPointerCoarse = window.matchMedia('(any-pointer: coarse)');
        const anyPointerFine = window.matchMedia('(any-pointer: fine)');
        
        const checkMobile = () => {
            const isTouchDevice = anyPointerCoarse.matches && !anyPointerFine.matches;
            const isPrimaryTouch = pointerCoarse.matches;
            
            setIsMobile(isTouchDevice || isPrimaryTouch);
        };

        checkMobile();

        pointerCoarse.addEventListener('change', checkMobile);
        anyPointerCoarse.addEventListener('change', checkMobile);
        anyPointerFine.addEventListener('change', checkMobile);

        return () => {
            pointerCoarse.removeEventListener('change', checkMobile);
            anyPointerCoarse.removeEventListener('change', checkMobile);
            anyPointerFine.removeEventListener('change', checkMobile);
        };
    }, []);

    return isMobile;
};