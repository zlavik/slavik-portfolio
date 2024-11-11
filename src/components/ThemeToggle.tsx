import styled from '@emotion/styled';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle = ({ isDark, toggleTheme }: ThemeToggleProps) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;
