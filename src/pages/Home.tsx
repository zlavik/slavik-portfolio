import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ReactConfetti from 'react-confetti';

const HomeContainer = styled.div`
  padding: 80px 0 0;
  height: calc(100vh - 140px);
  overflow-y: auto;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.text};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 4px;
  }
  transition: background-color 0.3s ease, color 0.3s ease;

`;

const HomePage = styled.div`
  min-height: calc(100vh - 140px);
  padding: 80px 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1.2rem 1.5rem;
  }
`;

const Hero = styled(motion.div)`
  text-align: left;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 800;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: 600;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }
`;

const HeroText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.darkGray};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ButtonBase = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  width: auto;
  transition: ${props => props.theme.transitions.default};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    font-size: 1rem;
  }
`;

const PrimaryButton = styled(ButtonBase)`
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.secondary : props.theme.colors.primary};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.lightGray};

  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};


  }
`;

const SecondaryButton = styled(ButtonBase)`
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.text};

  &:hover {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;

import { useState, useEffect } from 'react';

const Home = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <HomeContainer>
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['#456789', '#5499c7', '#f39c12', '#394b59']} // Using your theme colors
        />
      )}
      <HomePage>
        <Hero
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Transforming Complex Challenges into Scalable Solutions
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          > 
            I'm Slavik, a full-stack engineer passionate about innovation.          
          </HeroSubtitle>
          <HeroText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            With a focus on backend development and AI, I deliver efficient, scalable solutions that drive success.
          </HeroText>
          <CTAContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/portfolio" style={{ width: '100%' }}>
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See My Projects →
              </PrimaryButton>
            </Link>
            <Link to="/about" style={{ width: '100%' }}>
              <SecondaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More About Me →
              </SecondaryButton>
            </Link>
          </CTAContainer>
        </Hero>
      </HomePage>
    </HomeContainer>
  );
};

export default Home;
