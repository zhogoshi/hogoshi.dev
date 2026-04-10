import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import Lenis from 'lenis';
import Snap from 'lenis/snap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RootRef = RefObject<HTMLDivElement | null>;

export const useLenisGsapHome = (active: boolean, rootRef: RootRef, scrub: number | false = 0.78) => {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (!active) {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
                setLenis(null);
            }
            return;
        }

        const instance = new Lenis({
            lerp: 0.09,
            
            smoothWheel: true,
            syncTouch: true,
            autoRaf: false,
        });

        lenisRef.current = instance;
        setLenis(instance);

        const onScroll = () => {
            ScrollTrigger.update();
        };

        instance.on('scroll', onScroll);

        const ticker = (time: number) => {
            instance.raf(time * 1000);
        };

        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        return () => {
            instance.off('scroll', onScroll);
            gsap.ticker.remove(ticker);
            instance.destroy();
            lenisRef.current = null;
            setLenis(null);
        };
    }, [active]);

    useLayoutEffect(() => {
        if (!active || !lenis) return;

        const root = rootRef.current;
        if (!root) return;

        const slices = [...root.querySelectorAll<HTMLElement>('[data-scroll-slice]')];
        if (slices.length === 0) return;

        const snap = new Snap(lenis, {
            type: 'proximity',
            distanceThreshold: '30%',
            debounce: 140,
            lerp: 0.055,
            duration: 1.25,
            easing: (t) => Math.min(1, 1.001 - 2 ** (-8 * t)),
        });

        snap.addElements(slices, { align: 'center' });

        const onResize = () => {
            snap.resize();
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            snap.destroy();
        };
    }, [active, lenis, rootRef]);

    useLayoutEffect(() => {
        if (!active) return;

        let cancelled = false;
        let ctx: gsap.Context | null = null;

        const setup = () => {
            const root = rootRef.current;
            if (!root || cancelled) return;

            const slices = [...root.querySelectorAll<HTMLElement>('[data-scroll-slice]')];
            const panels = [...root.querySelectorAll<HTMLElement>('[data-home-panel]')].sort(
                (a, b) => Number(a.dataset.panelIndex) - Number(b.dataset.panelIndex)
            );

            if (slices.length === 0 || panels.length === 0 || slices.length !== panels.length) return;

            const n = panels.length;

            ctx = gsap.context(() => {
                panels.forEach((panel, i) => {
                    const slice = slices[i];
                    if (!slice) return;

                    const start = i === 0 ? 'top top' : 'top bottom';
                    const end = i === n - 1 ? 'bottom bottom' : 'bottom top';

                    if (i === 0) {
                        gsap
                            .timeline({
                                scrollTrigger: {
                                    trigger: slice,
                                    start,
                                    end,
                                    scrub,
                                    invalidateOnRefresh: true,
                                },
                            })
                            .fromTo(
                                panel,
                                {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                },
                                {
                                    autoAlpha: 0,
                                    yPercent: -11,
                                    scale: 0.94,
                                    filter: 'blur(16px)',
                                    ease: 'none',
                                    duration: 1,
                                }
                            );
                    } else if (i === n - 1) {
                        gsap
                            .timeline({
                                scrollTrigger: {
                                    trigger: slice,
                                    start,
                                    end,
                                    scrub,
                                    invalidateOnRefresh: true,
                                },
                            })
                            .fromTo(
                                panel,
                                {
                                    autoAlpha: 0,
                                    yPercent: 12,
                                    scale: 0.94,
                                    filter: 'blur(22px)',
                                },
                                {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                    ease: 'none',
                                    duration: 1,
                                }
                            );
                    } else {
                        gsap
                            .timeline({
                                scrollTrigger: {
                                    trigger: slice,
                                    start,
                                    end,
                                    scrub,
                                    invalidateOnRefresh: true,
                                },
                            })
                            .fromTo(
                                panel,
                                {
                                    autoAlpha: 0,
                                    yPercent: 13,
                                    scale: 0.93,
                                    filter: 'blur(20px)',
                                },
                                {
                                    autoAlpha: 1,
                                    yPercent: 0,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                    ease: 'none',
                                    duration: 0.5,
                                }
                            )
                            .to(panel, {
                                autoAlpha: 0,
                                yPercent: -13,
                                scale: 0.93,
                                filter: 'blur(11px)',
                                ease: 'none',
                                duration: 0.5,
                            });
                    }
                });

                const grid = document.querySelector<HTMLElement>('[data-parallax-grid]');
                if (grid) {
                    const scrollSpan = Math.max(1, root.offsetHeight - window.innerHeight);
                    gsap.fromTo(
                        grid,
                        { yPercent: 20 },
                        {
                            yPercent: -22,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: root,
                                start: 'top top',
                                end: () => `+=${scrollSpan}`,
                                scrub: 0.85,
                                invalidateOnRefresh: true,
                            },
                        }
                    );
                }

                ScrollTrigger.create({
                    trigger: root,
                    start: 'top top',
                    end: 'bottom bottom',
                    onUpdate: () => {
                        const top = root.offsetTop;
                        const h = window.innerHeight || 1;
                        const rel = window.scrollY - top + h * 0.2;
                        const idx = Math.min(n - 1, Math.max(0, Math.floor(rel / h)));
                        panels.forEach((panel, i) => {
                            panel.style.pointerEvents = i === idx ? 'auto' : 'none';
                        });
                    },
                });

                panels[0].style.pointerEvents = 'auto';
            }, root);

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        };

        const id = requestAnimationFrame(() => {
            requestAnimationFrame(setup);
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(id);
            ctx?.revert();
        };
    }, [active, scrub, rootRef]);

    if (!active) return null;
    return lenis;
};
