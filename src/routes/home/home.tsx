import { Navbar } from "@components"
import { LenisScrollProvider, useLenisScroll } from "@context/lenisScrollContext"
import styled from "@emotion/styled"
import { usePreloader } from "@hooks"
import { useLenisGsapHome } from "@hooks/useLenisGsapHome"
import { useReducedMotion } from "@hooks/useReducedMotion"
import { device } from "@utility"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const texts = [
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Designer"
]

const maxLength = Math.max(...texts.map(t => t.length))
const typingSlotCh = maxLength + 5

const SLICE_IDS = ["intro", "about", "connect"] as const

const UnifiedBackdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-color: var(--background);
`

const ScrollTrack = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
`

const ScrollSlice = styled.div`
    height: 100dvh;
    width: 100%;
    pointer-events: none;
    visibility: hidden;
`

const HomePanel = styled.div<{ $index: number }>`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
    z-index: ${(p) => 10 + p.$index};
    will-change: transform, opacity, filter;
    ${(p) => {
        if (p.$index === 0) return "filter: blur(0px);"
        if (p.$index === 1) {
            return `
        opacity: 0;
        visibility: hidden;
        filter: blur(20px);
    `
        }
        return `
        opacity: 0;
        visibility: hidden;
        filter: blur(22px);
    `
    }}
`

const PanelInner = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StackedSection = styled.section`
    min-height: 100dvh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background: transparent;
`

const SectionContent = styled(motion.div)`
    box-sizing: border-box;
    width: min(100%, 80%);
    max-width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    position: relative;
    z-index: 1;
    min-width: 0;

    @media ${device.md} {
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
    }
`

const GridBackdrop = styled.div`
    position: absolute;
    inset: -14%;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    transform-origin: 50% 50%;
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
`

const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 1 0;
    min-width: 0;
`

const TypingColumn = styled.div`
    box-sizing: border-box;
    flex: 0 1 auto;
    min-width: 0;
    width: min(${typingSlotCh}ch, 100%);
    max-width: 100%;
    align-self: flex-start;

    @media ${device.md} {
        align-self: center;
    }
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

const SectionHeading = styled.h2`
    color: var(--primary);
    font-weight: 600;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    margin-bottom: 1rem;
`

const SectionBody = styled.p`
    color: var(--secondary);
    font-weight: 400;
    line-height: 1.5;
    max-width: 36rem;
    margin-bottom: 1.25rem;
`

const StackList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    max-width: 36rem;
`

const StackItem = styled.li`
    color: var(--primary);
    font-family: "Courier New", monospace;
    font-size: 1rem;
    padding: 0.35rem 0.65rem;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
    background: color-mix(in srgb, var(--navbar-background) 70%, transparent);
`

const LinkRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.5rem;
`

const ExternalLink = styled.a`
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid color-mix(in srgb, var(--accent) 50%, transparent);
    padding-bottom: 2px;

    &:hover {
        color: var(--primary);
        border-bottom-color: var(--primary);
    }
`

const TypingTextContainer = styled(motion.div)`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    font-size: 1.3rem;
    font-family: "Courier New", monospace;
    text-align: left;
    font-weight: 400;
    min-height: 2.75rem;
    overflow-x: clip;
`

const UnderlineCursor = styled(motion.span)`
    display: inline-block;
    flex-shrink: 0;
    width: 1ch;
    height: 2px;
    background-color: var(--accent);
    align-self: flex-end;
    animation: blink 0.75s infinite;
    position: relative;

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
`

const TypingContent = styled(motion.span)`
    color: var(--primary);
    white-space: nowrap;
    flex-shrink: 0;
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
    "19 y.o. Java & Kotlin & TypeScript developer. Passionate about clean code and smart solutions. Creating efficient backends & engaging interfaces. Turning ordinary problems into extraordinary results."

const stackItems = ["TypeScript", "React", "Java", "Kotlin", "Spring", "Node", "Vite", "PostgreSQL", "Docker", "Git", "CI/CD", "Python", "Redis", "Docker", "Git", "CI/CD", "MongoDB", "Kafka"]

function IntroBlock() {
    return (
        <SectionContent>
            <LeftContent>
                <FirstSectionTitle>
                    Hello, I'm <FirstSectionTitleGradient>Hogoshi</FirstSectionTitleGradient>
                </FirstSectionTitle>
                <Description>{descriptionText}</Description>
            </LeftContent>
            <TypingColumn>
                <TypingText />
            </TypingColumn>
        </SectionContent>
    )
}

function AboutBlock() {
    return (
        <SectionContent style={{ height: "auto", minHeight: "40%" }}>
            <div>
                <SectionHeading>Stack & focus</SectionHeading>
                <SectionBody>
                    Full-stack delivery with emphasis on typed frontends, resilient APIs, and pragmatic architecture.
                    Comfortable owning features end-to-end from UI polish to persistence and deployment.
                </SectionBody>
                <StackList>
                    {stackItems.map((item) => (
                        <StackItem key={item}>{item}</StackItem>
                    ))}
                </StackList>
            </div>
        </SectionContent>
    )
}

function ConnectBlock() {
    return (
        <SectionContent style={{ height: "auto", minHeight: "40%" }}>
            <div>
                <SectionHeading>Connect</SectionHeading>
                <SectionBody>
                    Open to collaborations, internships, and interesting product work. Reach out if you want to build
                    something sharp together =)
                </SectionBody>
                <LinkRow>
                    <ExternalLink href="https://github.com/zhogoshi" rel="noreferrer" target="_blank">
                        GitHub
                    </ExternalLink>
                    <ExternalLink href="https://t.me/hogoshi" rel="noreferrer" target="_blank">
                        Telegram
                    </ExternalLink>
                    <ExternalLink href="https://www.linkedin.com/in/hogoshi/" rel="noreferrer" target="_blank">
                        LinkedIn
                    </ExternalLink>
                    <ExternalLink href="https://www.vk.com/hogoshi/" rel="noreferrer" target="_blank">
                        VK
                    </ExternalLink>
                    <ExternalLink href="mailto:me@hogoshi.dev">Email</ExternalLink>
                </LinkRow>
            </div>
        </SectionContent>
    )
}

function HomeHashSync() {
    const { isLoading } = usePreloader()
    const ctx = useLenisScroll()

    useEffect(() => {
        if (!ctx || isLoading) return
        const hash = window.location.hash
        if (!hash) return
        const id = requestAnimationFrame(() => {
            ctx.scrollToHash(hash)
        })
        return () => cancelAnimationFrame(id)
    }, [ctx, ctx?.lenis, isLoading])

    return null
}

function ReducedHomeFixed() {
    return (
        <>
            <UnifiedBackdrop aria-hidden>
                <GridBackdrop data-parallax-grid="" />
            </UnifiedBackdrop>
            <StackedSection id="intro">
                <PanelInner>
                    <IntroBlock />
                </PanelInner>
            </StackedSection>
            <StackedSection id="about">
                <PanelInner>
                    <AboutBlock />
                </PanelInner>
            </StackedSection>
            <StackedSection id="connect">
                <PanelInner>
                    <ConnectBlock />
                </PanelInner>
            </StackedSection>
        </>
    )
}

export const Home = () => {
    const { isLoading } = usePreloader()
    const reducedMotion = useReducedMotion()
    const rootRef = useRef<HTMLDivElement>(null)
    const scrollStory = !isLoading && !reducedMotion
    const lenis = useLenisGsapHome(scrollStory, rootRef, 0.78)

    if (reducedMotion) {
        return (
            <LenisScrollProvider lenis={null}>
                <HomeHashSync />
                <Navbar />
                <div style={{ position: "relative", zIndex: 1 }}>
                    <ReducedHomeFixed />
                </div>
            </LenisScrollProvider>
        )
    }

    return (
        <LenisScrollProvider lenis={lenis}>
            <HomeHashSync />
            <Navbar />
            <UnifiedBackdrop aria-hidden>
                <GridBackdrop data-parallax-grid="" />
            </UnifiedBackdrop>
            <ScrollTrack ref={rootRef} data-home-scroll-root>
                {SLICE_IDS.map((id) => (
                    <ScrollSlice key={id} id={id} data-scroll-slice="" aria-hidden />
                ))}
                <HomePanel data-home-panel="" data-panel-index={0} $index={0}>
                    <PanelInner>
                        <IntroBlock />
                    </PanelInner>
                </HomePanel>
                <HomePanel data-home-panel="" data-panel-index={1} $index={1}>
                    <PanelInner>
                        <AboutBlock />
                    </PanelInner>
                </HomePanel>
                <HomePanel data-home-panel="" data-panel-index={2} $index={2}>
                    <PanelInner>
                        <ConnectBlock />
                    </PanelInner>
                </HomePanel>
            </ScrollTrack>
        </LenisScrollProvider>
    )
}
