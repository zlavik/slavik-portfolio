import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.white}CC;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
  z-index: 1000;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  &:focus {
    outline: none;
    color: ${props => props.theme.colors.primary};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  position: relative;

  &.active {
    font-weight: 600;
    
    &:after {
      transform: scaleX(1);
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.theme.colors.secondary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
  &:last-child:hover {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};
    border-radius: 5px;
  }
  &:last-child {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};

  }
  &:hover {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};
  }
  &:focus {
    outline: none;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 2rem;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    transform: rotate(15deg);
    background: ${props => props.theme.colors.primary};
  }
  &:focus {
    outline: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
  &:focus {
    outline: none;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.white};
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;



const Navbar = ({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <motion.span 
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            whileHover={{ scale: 1.05 }}
          >
            Slavik
          </motion.span>
        </Logo>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLinks>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Home</NavLink>
            <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</NavLink>
            <NavLink to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</NavLink>
            <NavLink to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</NavLink>
            <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</NavLink>
          </NavLinks>
          <ThemeToggle onClick={toggleTheme}>
            {isDark ? <FaSun /> : <FaMoon />}
          </ThemeToggle>
          <MobileMenuButton ref={buttonRef} onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </div>
      </NavContainer>
      {isOpen && (
        <MobileMenu
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <MobileNavLinks>
            <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
            <NavLink to="/portfolio" onClick={toggleMenu}>Portfolio</NavLink>
            <NavLink to="/blog" onClick={toggleMenu}>Blog</NavLink>
            <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
          </MobileNavLinks>
        </MobileMenu>
      )}
    </Nav>
  );
};
export default Navbar;