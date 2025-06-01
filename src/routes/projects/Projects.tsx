import { icons } from "../../assets/icons";
import useIsMobile from "../../components/layout/useIsMobile";
import { motion } from "framer-motion";

export const projects = [
    {
        name: 'hogoshi.dev',
        description: 'my personal website',
        link: 'https://github.com/zhogoshi/hogoshi.dev'
    },
    {
        name: 'Animations',
        description: 'A powerful animation library for Java and Kotlin applications, providing smooth and customizable animations with support for various easing functions and keyframe-based animations.',
        link: 'https://github.com/zhogoshi/animations'
    }
]

export default function Projects() {
    const isMobile = useIsMobile();
    return (
        <div style={{
            width: '100%',
            minHeight: '20vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            paddingBottom: '100px'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                alignItems: 'center',
                width: isMobile ? '90%' : '40%',
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh',
                }}>
                    <h1>projects</h1>
                </div>
                <p>currently i have no cool projects, but i'm working on some of them, you can see them in my <a href="https://github.com/zhogoshi">github</a></p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {projects.map((project) => (
                        <motion.div 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: '10px',
                                borderRadius: '10px',
                                backgroundColor: 'var(--bg-color-secondary)',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                minHeight: '100px',
                                alignItems: 'center'
                            }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                window.open(project.link, '_blank')
                            }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                                <p style={{
                                    color: 'var(--text-color)',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>{project.link}</p>
                            </div>
                            <motion.div 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-color)',
                                    padding: '0 10px',
                                    height: '40px',
                                    width: '50px',
                                    backgroundColor: 'transparent'
                                }}>
                                <icons.outline.arrowRight />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}