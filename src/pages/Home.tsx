import styled from '@emotion/styled';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const HomePage = styled.div`
  min-height: calc(100vh - 140px);
  padding: 80px 2rem 0;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.darkBackground : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Hero = styled(motion.div)`
  text-align: left;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  order: 1;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: 2;
  }
`;

const HeroImage = styled(motion.div)`
  order: 2;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: 1;
    height: 300px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 800;
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const HeroText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.darkGray};
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;
  const FaceScene = ({ isHovered, isExploding }: { isHovered: boolean; isExploding: boolean }) => {
    const theme = useTheme();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        x.set(mouseX);
        y.set(mouseY);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    const eyeX = useTransform(x, [0, window.innerWidth], [-10, 10]);
    const eyeY = useTransform(y, [0, window.innerHeight], [-10, 10]);
  
    const shakeAnimation = isHovered ? {
      x: [0, -5, 5, -5, 5, 0],
      rotate: [0, -2, 2, -2, 2, 0],
    } : {};

    // Single color value that smoothly transitions
    const bodyColor = isHovered ? "#ff6b6b" : theme.colors.primary;

    return (
      <motion.svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 400 400"
        animate={shakeAnimation}
        transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
      >
        <motion.g
          initial={{ scale: 0 }}
          animate={{ 
            scale: isExploding ? [1, 1.2, 0] : 1,
            opacity: isExploding ? [1, 1, 0] : 1
          }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          {/* Main body with smooth color transition */}
          <motion.circle 
            cx="200" 
            cy="200" 
            r="90" 
            animate={{ fill: bodyColor }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        
          {/* Cute tuft on head */}
          <motion.path
            d="M180 120 Q200 100 220 120"
            fill={theme.colors.accent}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Duck bill */}
          <motion.path
            d="M180 200 Q200 220 220 200 L200 210 Z"
            fill="#FF9933"
            whileHover={{ scaleY: 1.1 }}
          />

          {/* Eyes with highlights */}
          <g>
            <circle cx="175" cy="180" r="15" fill="white" />
            <motion.circle 
              cx="175" 
              cy="180" 
              r="8" 
              fill="black" 
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.circle 
              cx="172" 
              cy="177" 
              r="3" 
              fill="white" 
            />

            <circle cx="225" cy="180" r="15" fill="white" />
            <motion.circle 
              cx="225" 
              cy="180" 
              r="8" 
              fill="black" 
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.circle 
              cx="222" 
              cy="177" 
              r="3" 
              fill="white" 
            />
          </g>

          {/* Wavy feather patterns */}
        
        </motion.g>
      </motion.svg>
    );
  };
const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const handleButtonClick = () => {
    setIsExploding(true);
    
    // Get the duck's position
    const duckElement = document.querySelector('.hero-image svg');
    if (duckElement) {
      const duckRect = duckElement.getBoundingClientRect();
      
      // Calculate the center point relative to viewport
      const x = (duckRect.left + duckRect.right) / 2 / window.innerWidth;
      const y = (duckRect.top + duckRect.bottom) / 2 / window.innerHeight;

      confetti({
        particleCount: 100,
        spread: 360,
        startVelocity: 30,
        origin: { x, y },
        colors: ['#FFD700', '#FFA500', '#FF6B6B', '#FF4500']
      });
    }
  };
  return (
    <HomePage>
      <Hero>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Oh hi! I'm Slavik
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional problem solver with an ADHD superpower: Turning "what if we..." into "holy cow, it works!"
          </HeroSubtitle>
          <HeroText
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            When hyperfocus kicks in, anything's possible.
            <br /><br />
            <strong>Currently:</strong> Building cool stuff<br />
            <strong>Previously:</strong> Made airplanes' data behave<br />
            <strong>Always:</strong> Hyperfocused on the next big thing
          </HeroText>
          <CTAContainer
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/portfolio">
              <PrimaryButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleButtonClick}
              >
                See what I built →
              </PrimaryButton>
            </Link>
          </CTAContainer>
        </HeroContent>
        <HeroImage className="hero-image">
          <FaceScene isHovered={isHovered} isExploding={isExploding} />
        </HeroImage>
      </Hero>
    </HomePage>
  );
};
export default Home;