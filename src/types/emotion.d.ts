import '@emotion/react';
import { theme } from '../styles/theme';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {
    colors: {
      primary: string
      secondary: string
      accent: string
      background: string
      text: string
      white: string
      lightGray: string
      darkGray: string
      inputBackground: string
      inputText: string
    }
    breakpoints: {
      mobile: string
      tablet: string
      desktop: string
    }
    transitions: {
      default: string
    }
  }
}
