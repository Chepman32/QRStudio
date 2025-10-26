/**
 * Animated Button Component Tests
 */

import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AnimatedButton} from '@/components/animations/AnimatedButton';

describe('AnimatedButton', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <AnimatedButton title="Click Me" onPress={() => {}} />,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <AnimatedButton title="Click Me" onPress={onPress} />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <AnimatedButton title="Click Me" onPress={onPress} disabled />,
    );

    fireEvent.press(getByText('Click Me'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should render with different variants', () => {
    const {rerender, getByText} = render(
      <AnimatedButton title="Primary" onPress={() => {}} variant="primary" />,
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <AnimatedButton title="Secondary" onPress={() => {}} variant="secondary" />,
    );
    expect(getByText('Secondary')).toBeTruthy();

    rerender(
      <AnimatedButton title="Ghost" onPress={() => {}} variant="ghost" />,
    );
    expect(getByText('Ghost')).toBeTruthy();
  });

  it('should have correct accessibility props', () => {
    const {getByLabelText} = render(
      <AnimatedButton
        title="Accessible Button"
        onPress={() => {}}
        accessibilityLabel="Test Button"
        accessibilityHint="Performs a test action"
      />,
    );

    expect(getByLabelText('Test Button')).toBeTruthy();
  });
});
