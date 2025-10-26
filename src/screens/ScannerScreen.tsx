/**
 * Scanner Screen - QR/Barcode scanner (placeholder)
 */

import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Scanner'>;

export const ScannerScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Scanner</Text>
        <Text style={styles.subtitle}>
          Camera scanning functionality would be implemented here
        </Text>
        <Text style={styles.note}>
          Note: Camera scanning requires additional native modules and permissions
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  title: {
    ...typography.h2,
    color: colors.light.text.primary,
    marginBottom: spacing[3],
  },
  subtitle: {
    ...typography.body1,
    color: colors.light.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  note: {
    ...typography.caption,
    color: colors.light.text.hint,
    textAlign: 'center',
  },
});
