import { useLenisScroll } from "@context/lenisScrollContext"
import styled from "@emotion/styled"
import { device, size } from "@utility"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

type NavItem = {
    title: string
    link: string
    hash?: string
}

const links: NavItem[] = [
    { title: "home", link: "/", hash: "intro" },
    { title: "about", link: "/", hash: "about" },
    { title: "connect", link: "/", hash: "connect" },
]

const NavbarWrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    pointer-events: none;
`


const NavbarContainer = styled.div`
    width: 100%;
    max-width: calc(100% - 32px);
    margin: 0 auto;
    padding: 0 16px;
    background: var(--navbar-background);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    position: relative;
    pointer-events: auto;
    
    @media ${device.sm} {
        width: 460px;
        max-width: calc(100% - 40px);
    }
    
    @media ${device.md} {
        width: 720px;
        padding: 0 24px;
    }
    
    @media ${device.lg} {
        width: 960px;
    }
    
    @media ${device.xl} {
        width: 1200px;
    }
    
    @media ${device.xxl} {
        width: 1320px;
    }
    
    @media ${device.wide} {
        width: 1600px;
    }
    
    @media ${device.ultra} {
        width: 2000px;
    }
`


const Title = styled(motion.h1)`
    color: var(--primary);
    text-shadow: 0 0 0 var(--primary);
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;


    @media ${device.sm} {
        font-size: 26px;
    }


    @media ${device.md} {
        font-size: 32px;
    }
`


const LinksContainer = styled.div`
    display: none;
    flex-direction: row;
    gap: 20px;
    
    @media ${device.md} {
        display: flex;
    }
`


const Link = styled(motion.p)`
    font-size: 18px;
    color: var(--primary);
    cursor: pointer;
`


const BurgerButton = styled(motion.button)`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1001;
    
    @media ${device.md} {
        display: none;
    }
`


const BurgerLine = styled(motion.span)`
    width: 100%;
    height: 3px;
    background: var(--primary);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: center;
`


const MobileMenuOverlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    z-index: 999;
    pointer-events: none;

    @media (prefers-color-scheme: dark) {
        background: rgba(0, 0, 0, 0.3);
    }
`


const MobileMenuContainer = styled(motion.div)`
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 460px;
    width: calc(100% - 32px);
    background: var(--navbar-background);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    padding: 24px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 16px;
    pointer-events: auto;
`


const MobileLink = styled(motion.p)`
    font-size: 20px;
    color: var(--primary);
    cursor: pointer;
    padding: 12px;
    text-align: center;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.3);

    @media (prefers-color-scheme: dark) {
        background: rgba(0, 0, 0, 0.1);
    }
`


export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scroll = useLenisScroll();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavItem = (item: NavItem) => {
        if (item.hash) {
            if (location.pathname === "/") {
                scroll?.scrollToHash(`#${item.hash}`);
            } else {
                navigate({ pathname: "/", hash: item.hash });
            }
        } else {
            navigate(item.link);
        }
        setIsMenuOpen(false);
    };

    const handleBrandClick = () => {
        if (location.pathname === "/") {
            scroll?.scrollToHash("#intro");
        } else {
            navigate("/");
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= size.md) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <>
            <NavbarWrapper>
                <NavbarContainer>
                    <Title
                        initial={false}
                        animate={{
                            textShadow: '0 0 0px var(--primary)'
                        }}
                        whileHover={{
                            textShadow: '0 0 10px var(--primary)',
                            scale: 1.02,
                            transition: { duration: 0.3, ease: 'easeOut' }
                        }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        onClick={handleBrandClick}
                    >
                        hogoshi.dev
                    </Title>

                    <LinksContainer>
                        {links.map((l) => (
                            <Link
                                key={`${l.link}-${l.hash ?? "root"}`}
                                initial={false}
                                animate={{
                                    textShadow: '0 0 0px var(--primary)'
                                }}
                                whileHover={{
                                    textShadow: '0 0 10px var(--primary)',
                                    scale: 1.02,
                                    transition: { duration: 0.3, ease: 'easeOut' }
                                }}
                                transition={{ duration: 0.3, ease: 'easeIn' }}
                                onClick={() => handleNavItem(l)}
                            >
                                {l.title}
                            </Link>
                        ))}
                    </LinksContainer>

                    <BurgerButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <BurgerLine
                            animate={isMenuOpen ? {
                                rotate: 45,
                                y: 10
                            } : {
                                rotate: 0,
                                y: 0
                            }}
                            transition={{ duration: 0.001 }}
                        />
                        <BurgerLine
                            animate={isMenuOpen ? {
                                opacity: 0
                            } : {
                                opacity: 1
                            }}
                            transition={{ duration: 0.1 }}
                        />
                        <BurgerLine
                            animate={isMenuOpen ? {
                                rotate: -45,
                                y: -10
                            } : {
                                rotate: 0,
                                y: 0
                            }}
                            transition={{ duration: 0.001 }}
                        />
                    </BurgerButton>
                </NavbarContainer>
            </NavbarWrapper>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <MobileMenuOverlay
                            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                            transition={{ duration: 0.3 }}
                            aria-hidden
                        />
                        <MobileMenuContainer
                            initial={{ opacity: 0, y: -20, x: '-50%', filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, x: '-50%', filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, x: '-50%', filter: 'blur(10px)' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >

                            {links.map((l, index) => (
                                <MobileLink
                                    key={l.link}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.05,
                                        ease: 'easeOut'
                                    }}
                                    whileHover={{
                                        textShadow: '0 0 10px var(--primary)',
                                        scale: 1.05,
                                        background: 'rgba(255, 255, 255, 0.1)'
                                    }}
                                    onClick={() => handleNavItem(l)}
                                >
                                    {l.title}
                                </MobileLink>
                            ))}
                        </MobileMenuContainer>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
