import { icons } from "../../assets/icons";
import useIsMobile from "../../components/layout/useIsMobile";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Repository {
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
    fork: boolean;
    updated_at: string;
}

export default function Projects() {
    const isMobile = useIsMobile();
    const [projects, setProjects] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/zhogoshi/repos');
                const data = await response.json();
                
                const filteredProjects = data
                    .filter((repo: Repository) => !repo.fork)
                    .sort((a: Repository, b: Repository) => a.stargazers_count + b.stargazers_count);
                
                setProjects(filteredProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

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
                    {loading ? (
                        <p>Loading projects...</p>
                    ) : (
                        projects.map((project) => (
                            <motion.div 
                                key={project.name}
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
                                    window.open(project.html_url, '_blank')
                                }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    width: '100%'
                                }}>
                                    <h2>{project.name}</h2>
                                    <p>{project.description || "No description available"}</p>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '10px',
                                        alignItems: 'center'
                                    }}>
                                        {project.language && (
                                            <span style={{
                                                color: 'var(--text-color)',
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                padding: '2px 0'
                                            }}>
                                                {project.language}
                                            </span>
                                        )}
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
                                    <p style={{
                                        color: 'var(--text-color)',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>{project.html_url}</p>
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
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}>
                                    <icons.outline.arrowRight />
                                </motion.div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}