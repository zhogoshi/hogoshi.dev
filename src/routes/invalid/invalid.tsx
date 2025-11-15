import { Navbar } from "@components"
import styled from "@emotion/styled"

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const AnimatedText = () => {
    return <div style={{ fontWeight: 'bold', height: '7.5rem' }}>
        <span style={{
            display: 'inline-block',
            animation: 'resize 2s ease-in-out infinite',
            color: 'var(--primary)'
        }}>o</span>
        <span style={{ fontSize: '3rem', color: 'var(--primary)' }}>.</span>
        <span style={{
            display: 'inline-block',
            animation: 'resize2 2s ease-in-out infinite',
            color: 'var(--primary)'
        }}>o</span>
        <style>
            {`
          @keyframes resize {
            0%, 100% {
                font-size: 3.5rem;
                text-shadow: 0 0 0 var(--primary);
            }
            50% {
                font-size: 7.5rem;
                text-shadow: 0 0 30px var(--primary);
            }
          }
          @keyframes resize2 {
            50% {
                font-size: 3.5rem;
                text-shadow: 0 0 0 var(--primary);
            }
            0%, 100% {
                font-size: 7.5rem;
                text-shadow: 0 0 30px var(--primary);
            }
          }
        `}
        </style>
    </div>
}

export const Invalid = () => {
    return <>
        <Navbar />
        <Container>
            <AnimatedText />
            <p style={{ fontSize: '3rem', textAlign: 'center', color: 'var(--secondary)' }}>page not found :c</p>
        </Container>
    </>
}