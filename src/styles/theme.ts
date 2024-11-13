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
  primary: '#456789',      
  secondary: '#5499c7',    
  accent: '#f39c12',       
  background: '#f8f9fb',   
  text: '#394b59',        
  white: '#ffffff',
  lightGray: '#f0f3f5',    
  darkGray: '#95a5a6',     
  inputBackground: '#f8f9fb', 
  inputText: '#394b59',    
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
