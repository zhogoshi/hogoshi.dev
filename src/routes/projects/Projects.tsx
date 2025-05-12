import useIsMobile from "../../hooks/useIsMobile";

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
                <h1>projects</h1>
            </div>
            <p>currently i have no projects, but i'm working on some of them, you can see them in my <a href="https://github.com/zhogoshi">github</a></p>
        </div>
    </div>
  )
}