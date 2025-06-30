import useIsMobile from "../../components/layout/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Repository {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    fork: boolean;
    pushed_at: string;
}

export default function Projects() {
    const isMobile = useIsMobile();
    const [projects, setProjects] = useState<Repository[]>([]);
    const [repoCount, setRepoCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRepoCount = async () => {
            try {
                const userResponse = await fetch('https://api.github.com/users/zhogoshi');
                const userData = await userResponse.json();
                const publicRepos = userData.public_repos || 3;
                setRepoCount(publicRepos);
                fetchProjects();
            } catch (error) {
                setRepoCount(3);
                fetchProjects();
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/zhogoshi/repos');
                const data = await response.json();

                const filteredProjects = data
                    .sort((a: Repository, b: Repository) => b.stargazers_count + a.stargazers_count);
                setTimeout(() => {
                    setProjects(filteredProjects);
                    setIsLoading(false);
                }, 3000);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects([]);
                setIsLoading(false);
            }
        };

        fetchRepoCount();
    }, []);

    const placeholderCount = repoCount || 3;

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
                <p>currently i'm working on some of better projects, you can see them in my <a href="https://github.com/zhogoshi">github</a></p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '100%'
                }}>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <>
                                {Array.from({ length: placeholderCount }).map((_, index) => (
                                    <ProjectPlaceholder key={`placeholder-${index}`} index={index} />
                                ))}
                            </>
                        ) : (
                            <>
                                {projects.map((project, index) => (
                                    <ProjectItem key={project.name} project={project} index={index} />
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function ProjectPlaceholder({ index }: { index: number }) {
    return (
        <motion.div
            layout
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-color-secondary)',
                border: '1px solid var(--border-color)',
                minHeight: '100px',
                alignItems: 'center',
                overflow: 'hidden'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                position: 'relative'
            }}>
                <ShimmerBlock width="70%" height="20px" delay={index * 0.2} />
                <ShimmerBlock width="90%" height="12px" delay={index * 0.2 + 0.1} />
                <ShimmerBlock width="50%" height="12px" delay={index * 0.2 + 0.2} />
            </div>
        </motion.div>
    );
}

// Shimmer block with light moving from left to right
function ShimmerBlock({ 
    width, 
    height, 
    delay = 0
}: { 
    width: string, 
    height: string, 
    delay?: number
}) {
    return (
        <div style={{ 
            position: 'relative', 
            width, 
            height, 
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: 'var(--border-color)'
        }}>
            {/* Shimmer effect overlay */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, transparent 0%, transparent 20%, rgba(255, 255, 255, 0.15) 50%, transparent 80%, transparent 100%)',
                    backgroundSize: '300% 100%',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '4px'
                }}
                animate={{
                    backgroundPosition: ['-100% 0', '200% 0']
                }}
                transition={{
                    ease: "linear",
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay
                }}
            />
        </div>
    );
}

function ProjectItem({ project, index }: { project: Repository, index: number }) {
    return (
        <motion.div
            layout
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1
            }}
            whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            onClick={() => {
                window.open(project.html_url, '_blank')
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '10px',
                        alignItems: 'center'
                    }}>
                        <h2>{project.name}</h2>
                        {project.language && (
                            <motion.span
                                style={{
                                    color: 'var(--text-color)',
                                    fontSize: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--bg-color)'
                                }}
                                whileHover={{
                                    backgroundColor: 'var(--border-color)',
                                    scale: 1.05
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {project.language}
                            </motion.span>
                        )}
                    </div>
                    <motion.span
                        style={{
                            color: 'var(--text-color)',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'transparent'
                        }}
                        whileHover={{
                            backgroundColor: 'var(--bg-color)',
                            scale: 1.05
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {project.stargazers_count}
                    </motion.span>
                </div>
                {project.description && (
                    <p>{project.description}</p>
                )}
                <p style={{
                    color: 'var(--text-color)',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>{project.html_url}</p>
                <p style={{
                    color: 'var(--text-color)',
                    fontSize: '12px',
                    opacity: 0.8
                }}>
                    Last updated: {new Date(project.pushed_at).toLocaleDateString()}
                </p>
            </div>
        </motion.div>
    );
}