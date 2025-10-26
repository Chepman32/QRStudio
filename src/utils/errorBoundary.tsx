/**
 * Error Boundary - Graceful error handling
 */

import React, {Component, ErrorInfo, ReactNode} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedButton} from '@/components';
import {colors, spacing, typography} from '@/theme';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({hasError: false, error: null});
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Oops!</Text>
            <Text style={styles.message}>
              Something went wrong. Don't worry, your data is safe.
            </Text>
            {__DEV__ && this.state.error && (
              <Text style={styles.error}>{this.state.error.toString()}</Text>
            )}
            <AnimatedButton
              title="Try Again"
              onPress={this.handleReset}
              variant="primary"
              accessibilityLabel="Reset error and try again"
            />
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  content: {
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.light.text.primary,
    marginBottom: spacing[4],
  },
  message: {
    ...typography.body1,
    color: colors.light.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  error: {
    ...typography.caption,
    color: colors.error.main,
    marginBottom: spacing[4],
    padding: spacing[3],
    backgroundColor: colors.error.light + '20',
    borderRadius: 8,
  },
});
