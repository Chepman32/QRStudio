/**
 * Input Component
 * Accessible text input with animations
 */

import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors, spacing, borderRadius, typography} from '@/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);
  const errorAnim = useSharedValue(0);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusAnim.value = withSpring(1);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusAnim.value = withSpring(0);
    onBlur?.(e);
  };

  React.useEffect(() => {
    errorAnim.value = withTiming(error ? 1 : 0, {duration: 200});
  }, [error]);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? colors.error.main
      : focusAnim.value > 0
      ? colors.primary[600]
      : colors.light.border,
    borderWidth: focusAnim.value > 0 ? 2 : 1,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View style={[styles.inputContainer, borderStyle]}>
        <TextInput
          {...textInputProps}
          style={[styles.input, textInputProps.style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={colors.light.text.hint}
        />
      </Animated.View>
      {error && <Text style={styles.error}>{error}</Text>}
      {helperText && !error && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[4],
  },
  label: {
    ...typography.subtitle2,
    color: colors.light.text.secondary,
    marginBottom: spacing[2],
  },
  inputContainer: {
    borderRadius: borderRadius.md,
    backgroundColor: colors.light.background.paper,
  },
  input: {
    ...typography.body1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    color: colors.light.text.primary,
    minHeight: 48,
  },
  error: {
    ...typography.caption,
    color: colors.error.main,
    marginTop: spacing[1],
  },
  helper: {
    ...typography.caption,
    color: colors.light.text.hint,
    marginTop: spacing[1],
  },
});
