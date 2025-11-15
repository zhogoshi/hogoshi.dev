import { createContext, useContext } from 'react';

interface PreloaderContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    addAsset: () => void;
    assetLoaded: () => void;
    loadingProgress: { loaded: number; total: number };
}

export const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (!context) {
        throw new Error('usePreloader must be used within PreloaderProvider');
    }
    return context;
};