import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
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
