export type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'linux' | 'unknown';

export const usePlatform = (): Platform => {
    if (typeof navigator === 'undefined') return 'unknown';
    const extendedNavigator = navigator as Navigator & { userAgentData?: { platform?: string } };
    const source = extendedNavigator.userAgentData?.platform || extendedNavigator.platform || extendedNavigator.userAgent || '';
    const value = source.toLowerCase();
    if (value.includes('iphone') || value.includes('ipad') || value.includes('ipod')) return 'ios';
    if (value.includes('android')) return 'android';
    if (value.includes('mac') || value.includes('macos')) return 'macos';
    if (value.includes('win')) return 'windows';
    if (value.includes('linux') || value.includes('x11')) return 'linux';
    return 'unknown';
};