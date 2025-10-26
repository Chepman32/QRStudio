/**
 * Typography System - SF Pro Text/Display with Dynamic Type scaling
 */

import {Platform} from 'react-native';

const fontFamily = {
  regular: Platform.select({
    ios: 'SF Pro Text',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'SF Pro Text Medium',
    android: 'Roboto Medium',
    default: 'System',
  }),
  semibold: Platform.select({
    ios: 'SF Pro Text Semibold',
    android: 'Roboto Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'SF Pro Text Bold',
    android: 'Roboto Bold',
    default: 'System',
  }),
  display: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
};

export const typography = {
  // Display styles
  h1: {
    fontFamily: fontFamily.display,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: fontFamily.display,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  h4: {
    fontFamily: fontFamily.display,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
  },

  // Body styles
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: -0.4,
  },
  body2: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: -0.2,
  },
  subtitle1: {
    fontFamily: fontFamily.medium,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: -0.2,
  },
  subtitle2: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
    letterSpacing: -0.1,
  },

  // Button styles
  button: {
    fontFamily: fontFamily.semibold,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.4,
  },
  buttonSmall: {
    fontFamily: fontFamily.semibold,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },

  // Caption & overline
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  overline: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },

  // Monospace for codes
  code: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
} as const;

// Dynamic Type multipliers
export const dynamicTypeMultipliers = {
  xs: 0.85,
  sm: 0.92,
  md: 1.0,
  lg: 1.12,
  xl: 1.25,
  xxl: 1.4,
  xxxl: 1.6,
} as const;

export type TypographyVariant = keyof typeof typography;
export type DynamicTypeSize = keyof typeof dynamicTypeMultipliers;
