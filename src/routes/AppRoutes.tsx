import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import Layout from '../layout/Layout';
import AnimatedText from '../components/AnimatedText';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="*" element={<Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <AnimatedText />
          <h2 style={{
            fontSize: '5vw',
            fontWeight: 500,
            color: '#666666'
          }}>Page not found</h2>
        </div>
      </Layout>} />
    </Routes>
  )
}

export default AppRoutes;