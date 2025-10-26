/**
 * Theme System - Central theme export
 */

import {colors, ThemeMode} from './colors';
import {typography} from './typography';
import {spacing, borderRadius, hitSlop} from './spacing';
import {shadows} from './shadows';

export interface Theme {
  mode: ThemeMode;
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  hitSlop: typeof hitSlop;
  shadows: typeof shadows;
}

export const createTheme = (mode: ThemeMode = 'light'): Theme => ({
  mode,
  colors,
  typography,
  spacing,
  borderRadius,
  hitSlop,
  shadows,
});

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
