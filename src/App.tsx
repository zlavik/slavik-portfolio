import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from './styles/theme';
import Navbar from './components/Navbar.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Portfolio from './pages/Portfolio.tsx';
import Blog from './pages/Blog.tsx';
import Contact from './pages/Contact.tsx';
import Footer from './components/Footer.tsx';
import { useState } from 'react';
import BlogPost from './pages/BlogPost';
import { HelmetProvider, Helmet } from 'react-helmet-async';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
  
  > *:not(footer) {
    flex: 1 0 auto;
  }
  
  footer {
    flex-shrink: 0;
  }
`;
function App() {
  const [isDark, setIsDark] = useState(true);
  const currentTheme = {
    ...theme,
    colors: isDark ? theme.colors.dark : theme.colors.light,
    mode: isDark ? 'dark' : 'light' as 'dark' | 'light'
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <Helmet>
          <title>Slavik Ferris | Full-Stack Engineering Solutions</title>
          <meta name="description" content="Expert full-stack engineering services transforming complex technical challenges into scalable, efficient solutions for innovative businesses." />
          <meta name="keywords" content="full-stack engineering, software architecture, technology consulting, web development, cloud solutions" />
          <link rel="canonical" href="https://www.slavikferris.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta property="og:type" content="professional services" />
          <meta property="og:title" content="Slavik Ferris - Full-Stack Engineering Solutions" />
          <meta property="og:description" content="Transforming complex technical challenges into competitive advantages through expert full-stack engineering." />
        </Helmet>
        <Router future={{ 
          v7_relativeSplatPath: true,
          v7_startTransition: true 
        }}>
          <AppWrapper>
            <Navbar isDark={isDark} toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </AppWrapper>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;