import { type FC, useCallback, useEffect, useRef } from "react";
import { useWindowSize, useMobile } from "@hooks";
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const base = css`
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 99999;
    will-change: transform;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    display: none;
`

const Dot = styled.div`
    ${base};
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: var(--primary);
    mix-blend-mode: difference;
`

const Ring = styled.div`
    ${base};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    mix-blend-mode: difference;
    border: 1px solid var(--primary);

    @media (prefers-color-scheme: dark) {
        border: 1px solid rgba(var(--primary-dark), 0.8);
    }

    @media (prefers-color-scheme: light) {
        border: 1px solid rgba(var(--primary-light), 0.8);
    }
`

export const Cursor: FC = () => {
    const { width, height } = useWindowSize();
    const isMobile = useMobile();
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: width / 2 || 0, y: height / 2 || 0 });
    const ringPos = useRef({ x: width / 2 || 0, y: height / 2 || 0 });
    const animationId = useRef<number>(0);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        mousePos.current = { x, y };
        if(!dot.current) return;
        dot.current.style.transform = `translate3d(${x - 1}px, ${y - 1}px, 0)`;
    }, []);
    const animateRing = useCallback(() => {
        if (!ring.current) return;
        const { x: targetX, y: targetY } = mousePos.current;
        const { x: currentX, y: currentY } = ringPos.current;
        const newX = currentX + (targetX - currentX) * 0.1;
        const newY = currentY + (targetY - currentY) * 0.1;
        ringPos.current = { x: newX, y: newY };
        ring.current.style.transform = `translate3d(${newX - 12}px, ${newY - 12}px, 0)`;
        animationId.current = requestAnimationFrame(animateRing);
    }, []);
    useEffect(() => {
        const displayValue = isMobile ? 'none' : 'block';
        const centerX = width / 2 || 0;
        const centerY = height / 2 || 0;
        if (dot.current) {
            dot.current.style.display = displayValue;
            dot.current.style.transform = `translate3d(${centerX - 1}px, ${centerY - 1}px, 0)`;
        }
        if (ring.current) {
            ring.current.style.display = displayValue;
            ring.current.style.transform = `translate3d(${centerX - 12}px, ${centerY - 12}px, 0)`;
        }
        if (!isMobile) {
            if (!animationId.current) {
                animationId.current = requestAnimationFrame(animateRing);
            }
        } else {
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
                animationId.current = 0;
            }
        }
        if (!isMobile) {
            document.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
                animationId.current = 0;
            }
        }
    }, [isMobile, width, height, handleMouseMove, animateRing]);
    return (
        <>
            <Ring ref={ring} />
            <Dot ref={dot} />
        </>
    )
}

Cursor.displayName = "Cursor"