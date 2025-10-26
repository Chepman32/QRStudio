/**
 * Shadow System - Elevation shadows for iOS and Android
 */

import {Platform} from 'react-native';

interface Shadow {
  shadowColor: string;
  shadowOffset: {width: number; height: number};
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

const createShadow = (
  elevation: number,
  opacity: number = 0.12,
  radius: number = elevation * 0.6,
): Shadow => ({
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: elevation * 0.5,
  },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: Platform.OS === 'android' ? elevation : 0,
});

export const shadows = {
  none: createShadow(0, 0, 0),
  sm: createShadow(2, 0.08, 1.5),
  md: createShadow(4, 0.12, 3),
  lg: createShadow(8, 0.16, 6),
  xl: createShadow(12, 0.2, 9),
  xxl: createShadow(16, 0.24, 12),
} as const;

export type ShadowSize = keyof typeof shadows;
