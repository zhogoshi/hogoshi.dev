import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from '../components/layout/Layout';
import { AnimatedText } from '../components/animated-text';
import { SuspenseLayout } from '../components/suspense';
import { useTheme } from '../components/layout/ThemeContext';
import About from './about/About';
import Projects from './projects/Projects';

const Home = lazy(() => import('./home/Home'));

const AppRoutes = () => {
  return (
    <SuspenseLayout>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/about" element={
          <Layout>
            <About />
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout>
            <Projects />
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
              <AnimatedText />
              <h2 style={{
                fontSize: '5vw',
                fontWeight: 100,
                color: useTheme().theme === 'light' ? '#afafaf' : '#aaaaaa'
              }}>page not found :c</h2>
            </div>
          </Layout>
        } />
      </Routes>
    </SuspenseLayout>
  )
}

export default AppRoutes;