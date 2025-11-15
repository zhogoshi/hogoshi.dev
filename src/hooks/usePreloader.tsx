import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { PreloaderContext } from './usePreloaderContext';

interface PreloaderProviderProps {
    children: ReactNode;
}

export const PreloaderProvider = ({ children }: PreloaderProviderProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [assetsCount, setAssetsCount] = useState(0);
    const [loadedAssetsCount, setLoadedAssetsCount] = useState(0);
    
    const DEBUG = false;

    const addAsset = () => {
        setAssetsCount(prev => prev + 1);
    };

    const assetLoaded = () => {
        setLoadedAssetsCount(prev => prev + 1);
    };

    const setLoading = (loading: boolean) => {
        setIsLoading(loading);
    };

    useEffect(() => {
        const checkInitialAssets = async () => {
            const images = Array.from(document.images);
            const videos = Array.from(document.querySelectorAll('video'));
            const allAssets = [...images, ...videos];
            const hasFontLoadingAPI = typeof document !== 'undefined' && 'fonts' in document && document.fonts;

            if (DEBUG) {
                console.log('assets:', {
                    images: images.length,
                    videos: videos.length,
                    fonts: hasFontLoadingAPI ? 'checking...' : 'not available',
                    total: allAssets.length + (hasFontLoadingAPI ? 1 : 0),
                    imageUrls: images.map(img => img.src),
                    videoUrls: videos.map(video => video.src)
                });
            }

            const totalAssets = allAssets.length + (hasFontLoadingAPI ? 1 : 0);

            if (totalAssets === 0) {
                if (DEBUG) console.log('no assets');
                setTimeout(() => setIsLoading(false), 500);
                return;
            }

            setAssetsCount(totalAssets);
            let loaded = 0;

            const checkAsset = (assetInfo?: string) => {
                loaded++;
                setLoadedAssetsCount(loaded);
                if (DEBUG) {
                    console.log(`loaded (${loaded}/${totalAssets})`, assetInfo || '');
                }
                if (loaded >= totalAssets) {
                    if (DEBUG) console.log('all is loaded');
                    setTimeout(() => setIsLoading(false), 300);
                }
            };

            if (hasFontLoadingAPI) {
                if (DEBUG) console.log('waiting for fonts');
                document.fonts.ready
                    .then(() => {
                        if (DEBUG) console.log('fonts loaded');
                        checkAsset('Fonts');
                    })
                    .catch(() => {
                        if (DEBUG) console.log('fonts failed to load');
                        checkAsset('Fonts');
                    });
            }

            allAssets.forEach((asset, index) => {
                if (asset.tagName === 'IMG') {
                    const img = asset as HTMLImageElement;
                    const imgInfo = `Image ${index + 1}: ${img.src}`;
                    if (img.complete) {
                        if (DEBUG) console.log(`image already loaded - ${imgInfo}`);
                        checkAsset(imgInfo);
                    } else {
                        if (DEBUG) console.log(`waiting for image - ${imgInfo}`);
                        img.addEventListener('load', () => checkAsset(imgInfo));
                        img.addEventListener('error', () => {
                            if (DEBUG) console.log(`image failed to load - ${imgInfo}`);
                            checkAsset(imgInfo);
                        });
                    }
                } else if (asset.tagName === 'VIDEO') {
                    const video = asset as HTMLVideoElement;
                    const videoInfo = `Video ${index + 1}: ${video.src}`;
                    if (video.readyState >= 3) {
                        if (DEBUG) console.log(`video already loaded - ${videoInfo}`);
                        checkAsset(videoInfo);
                    } else {
                        if (DEBUG) console.log(`waiting for video - ${videoInfo}`);
                        video.addEventListener('canplaythrough', () => checkAsset(videoInfo));
                        video.addEventListener('error', () => {
                            if (DEBUG) console.log(`video failed to load - ${videoInfo}`);
                            checkAsset(videoInfo);
                        });
                    }
                }
            });
        };

        const timer = setTimeout(() => {
            if (document.readyState === 'complete') {
                checkInitialAssets();
            } else {
                window.addEventListener('load', checkInitialAssets);
            }
        }, 100);

        const fallbackTimer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);

        return () => {
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
            window.removeEventListener('load', checkInitialAssets);
        };
    }, [DEBUG]);

    useEffect(() => {
        if (assetsCount > 0 && loadedAssetsCount >= assetsCount) {
            setTimeout(() => setIsLoading(false), 300);
        }
    }, [assetsCount, loadedAssetsCount]);

    // Expose debug info to window for testing
    useEffect(() => {
        if (DEBUG) {
            (window as { preloaderDebug?: Record<string, unknown> }).preloaderDebug = {
                isLoading,
                assetsCount,
                loadedAssetsCount,
                progress: assetsCount > 0 ? Math.round((loadedAssetsCount / assetsCount) * 100) : 0,
                forceFinish: () => setIsLoading(false),
                getAssetsList: () => {
                    const images = Array.from(document.images);
                    const videos = Array.from(document.querySelectorAll('video'));
                    return { images, videos };
                }
            };
        }
    }, [isLoading, assetsCount, loadedAssetsCount, DEBUG]);

    return (
        <PreloaderContext.Provider value={{ 
            isLoading, 
            setLoading, 
            addAsset, 
            assetLoaded, 
            loadingProgress: { loaded: loadedAssetsCount, total: assetsCount }
        }}>
            {children}
        </PreloaderContext.Provider>
    );
};