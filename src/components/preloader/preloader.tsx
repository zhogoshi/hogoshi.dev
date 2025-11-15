import styled from "@emotion/styled"
import { motion, AnimatePresence } from "framer-motion"
import { usePreloader } from '@hooks';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100vh;
  width: 100%;
`;

const Bar = styled(motion.div)`
  width: 8px;
  height: 12px;
  background: linear-gradient(180deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%);
  border-radius: 4px;
`;

export const Preloader = () => {
    const { isLoading, loadingProgress } = usePreloader();
    const showDebugInfo = false;
    const animationDuration = 0.3;

    return (
        <AnimatePresence>
            {showDebugInfo && (
                <div
                    key="debug-info"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        zIndex: 10000
                    }}>
                    <div>Loading: {isLoading ? 'YES' : 'NO'}</div>
                    <div>Assets: {loadingProgress.loaded}/{loadingProgress.total}</div>
                    <div>Progress: {loadingProgress.total > 0 ? Math.round((loadingProgress.loaded / loadingProgress.total) * 100) : 0}%</div>
                </div>
            )}
            {isLoading && (
                <Overlay
                    key="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    transition={{
                        scale: { duration: 0.4, ease: 'easeInOut' },
                        opacity: { duration: 0.4, delay: 0.2, ease: 'easeInOut' }
                    }}>
                    <LoaderContainer>
                        {[0, 1, 2, 3].map((index) => (
                            <Bar
                                key={index}
                                animate={{
                                    height: ['12px', '40px', '12px'],
                                }}
                                transition={{
                                    duration: animationDuration * 5.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * animationDuration,
                                }}
                            />
                        ))}
                    </LoaderContainer>
                </Overlay>
            )}
        </AnimatePresence>
    );
}

Preloader.displayName = 'Preloader'