import { Bottombar } from "../components/bottombar";

interface LayoutProps {
    children: React.ReactNode
    bottombar?: boolean
}

export default function Layout({ children, bottombar = true }: LayoutProps) {
  return (
    <div>
      {bottombar && <Bottombar />}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}>
        {children}
      </div>
    </div>
  )
}