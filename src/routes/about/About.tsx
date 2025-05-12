import useIsMobile from '../../hooks/useIsMobile'

export default function About() {
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
                gap: '10px',
                alignItems: isMobile ? 'center' : 'start',
                width: isMobile ? '90%' : '40%',
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '20vh'
                }}>
                    <h1>about me</h1>
                </div>
                <p>18yo java/kotlin developer from russia, always working on my own projects (not only code) and learning new things, currently but I'm looking for job for new experience and new friends</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'start'
                }}>
                    <div>
                        <h3>soft skills</h3>
                        <p>- team player / teamworker</p>
                        <p>- fast learner</p>
                        <p>- problem solver</p>
                        <p>- communication</p>
                        <p>- active listening</p>
                        <p>- empathy</p>
                        <p>- creativity</p>
                    </div>
                    <div>
                        <h4>hard skills</h4>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>java</h2>
                            <p>Spring, Spring Boot, Groovy, Micrometer, Maven, Gradle, JProfiler, ProGuard, Bukkit, Spigot, Recaf, JUnit, Mockito, WireMock, Hibernate, OpenAPI, GraalVM, Liquibase, JHipster</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>kotlin</h2>
                            <p>Kotlin, Ktor, Ktlint, Exposed, Kotest, MockK, Detekt, Javalin</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>js/ts</h2>
                            <p>React, Next.js, Svelte, TypeScript, NestJS, Node.js, Redux, Axios, Express.js, Vue.js, Angular</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>python</h2>
                            <p>Python3, Jupyter Notebook, FastAPI, Pandas, NumPy, Flask, Django</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>db</h2>
                            <p>MongoDB, PostgreSQL, MySQL, Redis, Cassandra, Elastic/OpenSearch</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>devops</h2>
                            <p>Docker, Kubernetes, OpenShift, Jenkins, Ansible, Prometheus, Grafana, Nexus, Reposilite, SonarQube, HashiCorp Vault, Terraform, Helm, Istio, Envoy, nginx, Lens, Kibana</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>networking/messaging</h2>
                            <p>Apache Kafka, NATS, REST, WebFlux, CORS, Micrometer, WebSocket</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: '10px',
                            alignItems: 'center'
                        }}>
                            <h2>tools</h2>
                            <p>Git, GitHub/GitLab CI/CD, VirtualBox, TestContainers, Jsoup, ZenUML, LLM, TTS, NLP, OpenGL, Temporal.io, SdkMan, KarateLabs, Linux, Pandoc</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}