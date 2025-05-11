import Sidebar from "../component/sidebar/Sidebar";

interface LayoutProps {
    children: React.ReactNode
    sidebar?: boolean
}

export default function Layout({ children, sidebar = true }: LayoutProps) {
  return (
    <div>
      {sidebar && <Sidebar />}
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