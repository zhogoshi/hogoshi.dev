import { Navbar } from "@components"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { device } from "@utility"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react";

const texts = [
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Designer"
]

const maxLength = Math.max(...texts.map(t => t.length))

const SectionBase = css`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    scroll-snap-align: start;
`

const SectionContent = styled(motion.div)`
    width: 80%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;

    @media ${device.md} {
        justify-content: space-between;
        flex-direction: row;
    }
`

const FirstSection = styled(motion.div)`
    ${SectionBase};
    background-color: transparent;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            repeating-linear-gradient(
                0deg,
                var(--accent) 0px,
                var(--accent) 1px,
                transparent 1px,
                transparent 40px
            ),
            repeating-linear-gradient(
                90deg,
                var(--accent) 0px,
                var(--accent) 1px,
                transparent 1px,
                transparent 40px
            );
        opacity: 0.15;
        mask-image: radial-gradient(
            ellipse 80% 60% at 50% 50%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0) 100%
        );
        -webkit-mask-image: radial-gradient(
            ellipse 80% 60% at 50% 50%,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0) 100%
        );
        pointer-events: none;
        z-index: 0;
    }
`


const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const FirstSectionTitle = styled(motion.h1)`
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 1rem;
`

const FirstSectionTitleGradient = styled(motion.span)`
    background: linear-gradient(to right, var(--accent), var(--secondary));
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 600;
`

const Description = styled(motion.p)`
    margin-top: 0.2rem;
    color: var(--secondary);
    font-weight: 400;
    max-width: 100%;
    line-height: 1.45;
    white-space: pre-line;

    @media ${device.md} {
        max-width: 40%;
    }
`

const TypingTextContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-family: 'Courier New', monospace;
    width: ${maxLength}ch;
    text-align: left;
    font-weight: 500;
    min-height: 2.4rem;
    width: 100%;

    @media ${device.md} {
        width: 50%;
    }
`

const UnderlineCursor = styled(motion.span)`
    display: inline-block;
    width: 1ch;
    height: 2px;
    background-color: var(--accent);
    align-self: flex-end;
    animation: blink 0.75s infinite;
    position: relative;

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
`

const TypingContent = styled(motion.span)`
    color: var(--primary);
`

const TypingText = () => {
    const [textIndex, setTextIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => Math.round(latest))
    const displayText = useTransform(rounded, (latest) => {
        const currentText = texts[textIndex]
        return isDeleting
            ? currentText.slice(0, currentText.length - latest)
            : currentText.slice(0, latest)
    })

    useEffect(() => {
        const currentText = texts[textIndex]
        const targetLength = isDeleting ? currentText.length : currentText.length

        const controls = animate(count, targetLength, {
            duration: 1,
            ease: "linear",
            onComplete: () => {
                if (!isDeleting) {
                    setTimeout(() => {
                        setIsDeleting(true)
                        count.set(0)
                    }, 1500)
                } else {
                    setIsDeleting(false)
                    setTextIndex((prev) => (prev + 1) % texts.length)
                    count.set(0)
                }
            }
        })
        return () => controls.stop()
    }, [textIndex, isDeleting, count])

    return (
        <TypingTextContainer>
            <TypingContent>{displayText}</TypingContent>
            <UnderlineCursor />
        </TypingTextContainer>
    )
}

const descriptionText =
    "My name is Vadim, 18 y.o. Java, Kotlin & TypeScript developer. Passionate about clean code and smart solutions. Creating efficient backends & engaging interfaces. Turning ordinary problems into extraordinary results."

export const Home = () => {
    return <>
        <Navbar />
        <div style={{
            height: '100vh',
            overflowY: 'scroll',
            scrollSnapType: 'y mandatory'
        }}>
            <FirstSection>
                <SectionContent>
                    <LeftContent>
                        <FirstSectionTitle>
                            Hello, I'm <FirstSectionTitleGradient>Hogoshi</FirstSectionTitleGradient>
                        </FirstSectionTitle>
                        <Description>
                            {descriptionText}
                        </Description>
                    </LeftContent>
                    <TypingText />
                </SectionContent>
            </FirstSection>
        </div>
    </>
}
