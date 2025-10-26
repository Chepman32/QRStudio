/**
 * Color Tokens - Accessible palette with light/dark variants
 * Follows WCAG AA standards for contrast ratios
 */

export const colors = {
  // Primary palette
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  // Secondary palette
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },

  // Semantic colors
  success: {
    light: '#4CAF50',
    main: '#2E7D32',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  warning: {
    light: '#FF9800',
    main: '#F57C00',
    dark: '#E65100',
    contrastText: '#000000',
  },

  error: {
    light: '#EF5350',
    main: '#D32F2F',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },

  info: {
    light: '#29B6F6',
    main: '#0288D1',
    dark: '#01579B',
    contrastText: '#FFFFFF',
  },

  // Neutral palette
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Light theme
  light: {
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
      elevated: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      hint: '#9E9E9E',
    },
    divider: '#E0E0E0',
    border: '#EEEEEE',
    shadow: 'rgba(0, 0, 0, 0.12)',
  },

  // Dark theme
  dark: {
    background: {
      default: '#121212',
      paper: '#1E1E1E',
      elevated: '#2C2C2C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
      disabled: '#666666',
      hint: '#808080',
    },
    divider: '#383838',
    border: '#2C2C2C',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },

  // QR Code specific colors
  qrColors: {
    black: '#000000',
    white: '#FFFFFF',
    blue: '#2196F3',
    red: '#F44336',
    green: '#4CAF50',
    purple: '#9C27B0',
    orange: '#FF9800',
    pink: '#E91E63',
    teal: '#009688',
    indigo: '#3F51B5',
  },
} as const;

export type ColorPalette = typeof colors;
export type ThemeMode = 'light' | 'dark';
