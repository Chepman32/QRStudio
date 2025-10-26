/**
 * Animated Button - Component 1.1
 * Press-responsive button with spring animations and Skia shadows
 */

import React from 'react';
import {Pressable, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import {Canvas, RoundedRect, Shadow, LinearGradient, vec} from '@shopify/react-native-skia';
import {ButtonProps, AccessibilityProps} from '@/types';
import {colors, spacing, borderRadius, typography} from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends ButtonProps, AccessibilityProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
  accessible = true,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
}) => {
  // Shared values for animations
  const scale = useSharedValue(1);
  const elevation = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Spring configuration matching Motion 1-1
  const springConfig = {
    stiffness: 240,
    damping: 18,
  };

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scale.value, [0.96, 1], [0, -8]);
    const shadowSigma = interpolate(elevation.value, [0, 1], [0, 4]);

    return {
      transform: [{scale: scale.value}, {translateY}],
      opacity: opacity.value,
    };
  });

  // Gesture handlers
  const handlePressIn = () => {
    scale.value = withSpring(0.96, springConfig);
    elevation.value = withSpring(1, springConfig);
    opacity.value = withTiming(0.75, {duration: 100});
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
    elevation.value = withTiming(0, {duration: 260, easing: Easing.out(Easing.cubic)});
    opacity.value = withTiming(1, {duration: 260});
  };

  // Get variant colors
  const getVariantColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: colors.primary[600],
          text: colors.light.text.primary,
        };
      case 'secondary':
        return {
          background: colors.secondary[600],
          text: colors.light.text.primary,
        };
      case 'ghost':
        return {
          background: 'transparent',
          text: colors.primary[600],
        };
      case 'danger':
        return {
          background: colors.error.main,
          text: colors.error.contrastText,
        };
      default:
        return {
          background: colors.primary[600],
          text: colors.light.text.primary,
        };
    }
  };

  const variantColors = getVariantColors();

  // Size configuration
  const sizeConfig = {
    small: {
      height: 36,
      paddingHorizontal: spacing[4],
      fontSize: 14,
    },
    medium: {
      height: 48,
      paddingHorizontal: spacing[6],
      fontSize: 16,
    },
    large: {
      height: 56,
      paddingHorizontal: spacing[8],
      fontSize: 18,
    },
  };

  const currentSize = sizeConfig[size];

  return (
    <AnimatedPressable
      onPress={disabled || loading ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.button,
        {
          height: currentSize.height,
          paddingHorizontal: currentSize.paddingHorizontal,
          backgroundColor: variantColors.background,
          width: fullWidth ? '100%' : undefined,
        },
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{disabled}}>
      <Text
        style={[
          styles.text,
          {
            color: variantColors.text,
            fontSize: currentSize.fontSize,
          },
          textStyle,
        ]}>
        {title}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    gap: spacing[2],
  },
  text: {
    ...typography.button,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
