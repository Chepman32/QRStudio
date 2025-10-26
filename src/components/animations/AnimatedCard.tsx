/**
 * Animated Card - Component 1.2
 * Interactive card with gesture handlers and Skia effects
 */

import React from 'react';
import {StyleSheet, ViewStyle, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {CardProps, AccessibilityProps} from '@/types';
import {colors, spacing, borderRadius, shadows} from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedCardProps extends CardProps, AccessibilityProps {
  style?: ViewStyle;
  enableSwipeDismiss?: boolean;
  onSwipeDismiss?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  variant = 'default',
  padding = spacing[4],
  style,
  enableSwipeDismiss = false,
  onSwipeDismiss,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
}) => {
  // Shared values
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Spring config matching Motion 1-2
  const springConfig = {
    stiffness: 240,
    damping: 18,
  };

  // Pan gesture for swipe dismiss
  const panGesture = Gesture.Pan()
    .enabled(enableSwipeDismiss)
    .onUpdate(e => {
      translateX.value = e.translationX;
      opacity.value = interpolate(Math.abs(e.translationX), [0, 100], [1, 0.5]);
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > 100) {
        // Dismiss threshold
        translateX.value = withTiming(e.translationX > 0 ? 400 : -400, {duration: 200});
        opacity.value = withTiming(0, {duration: 200});
        if (onSwipeDismiss) {
          runOnJS(onSwipeDismiss)();
        }
      } else {
        // Reset
        translateX.value = withSpring(0, springConfig);
        opacity.value = withSpring(1, springConfig);
      }
    });

  // Tap gesture
  const tapGesture = Gesture.Tap()
    .enabled(!!onPress)
    .onBegin(() => {
      scale.value = withSpring(0.98, springConfig);
      translateY.value = withSpring(-4, springConfig);
    })
    .onFinalize(() => {
      scale.value = withSpring(1, springConfig);
      translateY.value = withSpring(0, springConfig);
      if (onPress) {
        runOnJS(onPress)();
      }
    });

  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
    opacity: opacity.value,
  }));

  // Get variant style
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.light.border,
        };
      case 'elevated':
        return {
          backgroundColor: colors.light.background.paper,
          ...shadows.md,
        };
      default:
        return {
          backgroundColor: colors.light.background.paper,
        };
    }
  };

  return (
    <GestureDetector gesture={composedGesture}>
      <AnimatedPressable
        style={[
          styles.card,
          getVariantStyle(),
          {padding},
          animatedStyle,
          style,
        ]}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole={accessibilityRole}>
        {children}
      </AnimatedPressable>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
});
