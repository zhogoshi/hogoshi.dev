import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './components/layout/ThemeContext'
import { SuspenseLayout } from './components/suspense/Suspense';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SuspenseLayout>
          <AppContent />
        </SuspenseLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const AppContent = () => {
  return (
    <AppRoutes/>
  )
}

export default App
