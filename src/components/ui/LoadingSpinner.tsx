/**
 * Loading Spinner Component
 * Animated loading indicator with Skia
 */

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Canvas, Circle, Group} from '@shopify/react-native-skia';
import {colors} from '@/theme';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  color = colors.primary[600],
}) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Animated.View style={[{width: size, height: size}, animatedStyle]}>
        <Canvas style={{width: size, height: size}}>
          <Group>
            <Circle cx={size / 2} cy={size / 2} r={size / 2 - 4} color={color} style="stroke" strokeWidth={3} opacity={0.3} />
            <Circle cx={size / 2} cy={4} r={3} color={color} />
          </Group>
        </Canvas>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
