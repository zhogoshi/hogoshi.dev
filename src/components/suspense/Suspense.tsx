import { Suspense, useEffect, useState } from 'react';
import { Preloader } from '../preloader/Preloader';

interface SuspenseLayoutProps {
    children: React.ReactNode;
}

export const SuspenseLayout = ({ children }: SuspenseLayoutProps) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const checkDOMReady = () => {
            const images = Array.from(document.getElementsByTagName('img'));
            const scripts = Array.from(document.getElementsByTagName('script'));
            const styles = Array.from(document.getElementsByTagName('link'));

            const allElementsLoaded = [
                ...images,
                ...scripts,
                ...styles
            ].every(element => {
                if (element instanceof HTMLImageElement) {
                    return element.complete;
                }
                return true;
            });

            if (allElementsLoaded) {
                setTimeout(() => {
                    setIsFirstLoad(false);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 500);
                }, 1000);
            }
        };

        if (document.readyState === 'complete') {
            checkDOMReady();
        } else {
            window.addEventListener('load', checkDOMReady);
            return () => window.removeEventListener('load', checkDOMReady);
        }
    }, []);

    return (
        <>
            {isVisible && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 9999,
                    opacity: isFirstLoad ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                    pointerEvents: isFirstLoad ? 'auto' : 'none'
                }}>
                    <Preloader fullScreen={true} />
                </div>
            )}
            <Suspense fallback={<Preloader fullScreen={false} />}>
                {children}
            </Suspense>
        </>
    );
};