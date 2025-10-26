/**
 * useDynamicType Hook - Dynamic Type accessibility support
 */

import {useState, useEffect} from 'react';
import {AccessibilityInfo} from 'react-native';
import {DynamicTypeSize, dynamicTypeMultipliers} from '@/theme/typography';

export const useDynamicType = (): {
  multiplier: number;
  size: DynamicTypeSize;
} => {
  const [multiplier, setMultiplier] = useState(1.0);

  useEffect(() => {
    const updateMultiplier = async () => {
      const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      if (isScreenReaderEnabled) {
        setMultiplier(dynamicTypeMultipliers.lg);
      }
    };

    updateMultiplier();

    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      updateMultiplier,
    );

    return () => subscription.remove();
  }, []);

  const getSize = (): DynamicTypeSize => {
    if (multiplier <= 0.9) return 'sm';
    if (multiplier <= 1.0) return 'md';
    if (multiplier <= 1.15) return 'lg';
    if (multiplier <= 1.3) return 'xl';
    if (multiplier <= 1.5) return 'xxl';
    return 'xxxl';
  };

  return {multiplier, size: getSize()};
};
