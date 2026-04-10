import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import type Lenis from 'lenis';

export const readDocumentScrollY = (lenis: Lenis | null): number => {
    if (lenis != null) return lenis.scroll;
    const { position, top } = document.body.style;
    if (position === 'fixed' && top) {
        const n = parseFloat(top);
        if (!Number.isNaN(n)) return Math.max(0, -n);
    }
    return window.scrollY || document.documentElement.scrollTop || 0;
};

const getTargetScrollYForSectionCenter = (el: HTMLElement, scrollBaseY: number): number => {
    const rect = el.getBoundingClientRect();
    const pageY = rect.top + scrollBaseY;
    const centerY = pageY + rect.height / 2;
    let target = centerY - window.innerHeight / 2;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    target = Math.max(0, Math.min(maxScroll, target));
    return target;
};

const resolveHashTarget = (hash: string): HTMLElement | null => {
    if (!hash.startsWith('#')) return null;
    const root = document.querySelector('[data-home-scroll-root]');
    const scoped = root?.querySelector<HTMLElement>(hash);
    if (scoped) return scoped;
    return document.querySelector<HTMLElement>(hash);
};

type LenisScrollContextValue = {
    lenis: Lenis | null;
    scrollToHash: (hash: string) => void;
};

export const LenisScrollContext = createContext<LenisScrollContextValue | null>(null);

type LenisScrollProviderProps = {
    lenis: Lenis | null;
    children: ReactNode;
};

export const LenisScrollProvider = ({ lenis, children }: LenisScrollProviderProps) => {
    const scrollToHash = useCallback((hash: string) => {
        if (!hash.startsWith('#')) return;

        const run = () => {
            const el = resolveHashTarget(hash);
            if (!el) return;
            const targetY = getTargetScrollYForSectionCenter(el, readDocumentScrollY(lenis));
            if (lenis) {
                lenis.scrollTo(targetY, {
                    lerp: 0.12,
                    programmatic: true,
                    force: true,
                });
            } else {
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
        };

        requestAnimationFrame(() => {
            requestAnimationFrame(run);
        });
    }, [lenis]);

    const value = useMemo(() => ({ lenis, scrollToHash }), [lenis, scrollToHash]);

    return <LenisScrollContext.Provider value={value}>{children}</LenisScrollContext.Provider>;
};

export const useLenisScroll = () => useContext(LenisScrollContext);
