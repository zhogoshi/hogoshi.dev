import { HashRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext'
import { SuspenseLayout } from './components/suspense/Suspense';

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <SuspenseLayout>
          <AppContent />
        </SuspenseLayout>
      </HashRouter>
    </ThemeProvider>
  )
}

const AppContent = () => {
  return (
    <AppRoutes/>
  )
}

export default App
