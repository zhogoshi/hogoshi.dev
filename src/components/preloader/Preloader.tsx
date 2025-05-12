import type { FC } from "react"
import { useTheme } from "../../context/ThemeContext"

interface PreloaderFC {
    fullScreen: boolean
}

export const Preloader: FC<PreloaderFC> = ({ fullScreen = true }) => {
    const { theme } = useTheme()
    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...(fullScreen ? {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                zIndex: 9999
            } : {
                width: '100%',
                height: '100%'
            })
        }}>
            <div style={{
                display: 'flex',
                gap: '8px'
            }}>
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: theme === 'dark' ? '#ffffff' : '#1a1a1a',
                            animation: `pulse 1.4s ease-in-out ${index * 0.2}s infinite`,
                            transform: 'scale(0.3)',
                            opacity: 0.3
                        }}
                    />
                ))}
            </div>
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            transform: scale(0.3);
                            opacity: 0.3;
                        }
                        50% {
                            transform: scale(1);
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    )
}