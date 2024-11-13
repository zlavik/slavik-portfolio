import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled(motion.footer)`
  background-color: ${props => `${props.theme.colors.primary}CC`}; 
  backdrop-filter: blur(5px);
  color: ${props => props.theme.colors.white};
  padding: 0.5rem;
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem; // Add horizontal padding
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem; // Slightly less padding on mobile
  }
`;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: ${props => props.theme.colors.white};
    font-size: 1rem;
    transition: ${props => props.theme.transitions.default};
  
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
`;
const Footer = () => {
  return (
    <FooterContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ opacity: 0 }}  // Set initial style
    >
      <FooterContent>
        <FooterText>
          <span>Slavik Ferris</span>
          <span>•</span>
          <span>Software Engineer</span>
        </FooterText>
        <SocialLinks>
          <a href="https://github.com/zlavik" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/slavik-ferris" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};
export default Footer;
