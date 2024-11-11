interface Theme {
  colors: {
    light: ColorScheme;
    dark: ColorScheme;
  };
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
}

const lightColors = {
  primary: '#2D3047',
  secondary: '#419D78',
  accent: '#E0A458',
  background: '#FAFAFA',
  text: '#2D3047',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#4A4A4A',
  inputBackground: '#FFFFFF',
  inputText: '#2D3047',
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