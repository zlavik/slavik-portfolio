interface Theme {
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
  mode: 'light' | 'dark';
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  transitions: {
    default: string;
  };
}

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  white: string;
  lightGray: string;
  darkGray: string;
  inputBackground: string;
  inputText: string;
  darkBackground: string;
  lightText: string;
}

const lightColors = {
  primary: '#456789',      // Softer blue-gray
  secondary: '#5499c7',    // Muted blue
  accent: '#f39c12',       // Warmer orange
  background: '#f8f9fb',   // Slightly warmer white
  text: '#394b59',         // Softer dark blue for text
  white: '#ffffff',
  lightGray: '#f0f3f5',    // Warmer light gray
  darkGray: '#95a5a6',     // Softer dark gray
  inputBackground: '#f8f9fb', // Matching background
  inputText: '#394b59',    // Matching text color
  darkBackground: '#ffffff',
  lightText: '#394b59'
}

const darkColors = {
  primary: '#E0A458',
  secondary: '#419D78',
  accent: '#2D3047',
  background: '#1A1A1A',
  text: '#FFFFFF',
  white: '#2D3047',
  lightGray: '#333333',
  darkGray: '#CCCCCC',
  inputBackground: '#2D3047',
  inputText: '#FFFFFF',
  darkBackground: '#1a1a1a',
  lightText: '#e0e0e0'
}

export const theme = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
  transitions: {
    default: '0.3s ease-in-out',
  },
};

export type { Theme };
