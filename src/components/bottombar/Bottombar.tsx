import { useTheme } from '../layout/ThemeContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const isMobile = () => window.innerWidth <= 768

const Tooltip = ({ text, show }: { text: string, show: boolean }) => {
  const { theme } = useTheme()
  return (
    <span
      style={{
        position: 'absolute',
        bottom: '60px',
        left: '50%',
        transform: `translateX(-50%) scale(${show ? 1 : 0})`,
        transformOrigin: 'bottom center',
        background: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(26,26,26,0.7)',
        color: theme === 'light' ? '#333' : '#fff',
        fontWeight: 300,
        padding: '8px 18px',
        borderRadius: '30px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        transition: 'all 0.3s',
        zIndex: 1000,
        boxShadow: '0 0 16px ' + (theme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)'),
        opacity: show ? 1 : 0
      }}
    >
      {text}
    </span>
  )
}

export const Bottombar = () => {
  const { theme, toggleTheme } = useTheme()
  const [hovered, setHovered] = useState<string | null>(null)

  const iconStyle = {
    color: theme === 'light' ? '#333' : '#fff',
    position: 'relative' as const,
    padding: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none'
  }

  const barStyle = {
    position: 'fixed' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    height: '60px',
    width: 'fit-content',
    minWidth: '300px',
    background: theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(26,26,26,0.7)',
    borderRadius: '30px',
    boxShadow: '0 0 16px ' + (theme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)'),
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
    padding: '0 20px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)'
  }

  return (
    <>
      <nav style={{
        ...barStyle,
        bottom: '20px',
        top: undefined
      }}>
        <Link to="/" style={iconStyle}
          onMouseEnter={() => { if (!isMobile()) setHovered('home') }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <Tooltip text="Home" show={hovered === 'home'} />
        </Link>
        <Link to="/about" style={iconStyle}
          onMouseEnter={() => { if (!isMobile()) setHovered('about') }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <Tooltip text="About" show={hovered === 'about'} />
        </Link>
        <Link to="/projects" style={iconStyle}
          onMouseEnter={() => { if (!isMobile()) setHovered('projects') }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h18v18H3z" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <Tooltip text="Projects" show={hovered === 'projects'} />
        </Link>
        {/* <Link to="https://shiora.hogoshi.dev/" style={iconStyle}
          onMouseEnter={() => { if (!isMobile()) setHovered('shiora') }}
          onMouseLeave={() => setHovered(null)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <Tooltip text="Shiora" show={hovered === 'shiora'} />
        </Link> */}
        <button
          onClick={toggleTheme}
          style={{
            ...iconStyle,
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={() => { if (!isMobile()) setHovered('theme') }}
          onMouseLeave={() => setHovered(null)}
        >
          {theme === 'light' ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
          <Tooltip text="Switch Theme" show={hovered === 'theme'} />
        </button>
      </nav>
    </>
  )
}