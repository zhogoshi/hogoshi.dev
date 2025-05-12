import { useTheme } from "../../context/ThemeContext";
import useIsMobile from "../../hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();
  const theme = useTheme().theme;
  return (
    <div style={{
      width: '100%',
      height: isMobile ? 'auto' : '100vh',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: isMobile ? '40px 10px 20px 10px' : 0,
    }}>
      <h1 style={{
        fontFamily: 'Panchang',
        fontSize: isMobile ? '40px' : '100px',
        fontWeight: 'bold',
        color: theme === 'light' ? '#000000' : '#ffffff',
        paddingBottom: isMobile ? '10px' : '20px',
        textAlign: isMobile ? 'center' : 'left',
        lineHeight: 1.1
      }}>hogoshi.</h1>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '2px' : '10px',
        alignItems: 'center',
        width: isMobile ? '100%' : 'auto'
      }}>
      <h2 style={{
          fontWeight: 200,
          fontSize: isMobile ? '18px' : 'inherit',
          textAlign: isMobile ? 'left' : 'inherit'
        }}>
          Extraordinaire
        </h2>
        <h2 style={{
          fontSize: isMobile ? '18px' : 'inherit',
          textAlign: isMobile ? 'left' : 'inherit'
        }}>
        Java/Kotlin Developer
      </h2>
      <h2 style={{
          fontWeight: 200,
          fontSize: isMobile ? '18px' : 'inherit',
          textAlign: 'center'
        }}>
          with a passion for building scalable and efficient systems.
        </h2>
      </div>
    </div>
  )
}