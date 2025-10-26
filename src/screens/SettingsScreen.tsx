/**
 * Settings Screen - App configuration
 */

import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Switch} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';
import {useSettingsStore} from '@/store';
import {AnimatedCard} from '@/components';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<Props> = () => {
  const {settings, updateSettings, toggleTheme} = useSettingsStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <AnimatedCard style={styles.setting}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Theme</Text>
              <Text style={styles.settingValue}>{settings.theme}</Text>
            </View>
          </AnimatedCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <AnimatedCard style={styles.setting}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Auto Save</Text>
              <Switch
                value={settings.autoSave}
                onValueChange={value => updateSettings({autoSave: value})}
                accessibilityLabel="Auto save toggle"
              />
            </View>
          </AnimatedCard>
          <AnimatedCard style={styles.setting}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
              <Switch
                value={settings.hapticFeedback}
                onValueChange={value => updateSettings({hapticFeedback: value})}
                accessibilityLabel="Haptic feedback toggle"
              />
            </View>
          </AnimatedCard>
          <AnimatedCard style={styles.setting}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Sound Effects</Text>
              <Switch
                value={settings.soundEffects}
                onValueChange={value => updateSettings({soundEffects: value})}
                accessibilityLabel="Sound effects toggle"
              />
            </View>
          </AnimatedCard>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <AnimatedCard style={styles.setting}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </AnimatedCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  content: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.light.text.primary,
    marginBottom: spacing[3],
  },
  setting: {
    marginBottom: spacing[2],
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    ...typography.body1,
    color: colors.light.text.primary,
  },
  settingValue: {
    ...typography.body2,
    color: colors.light.text.secondary,
  },
});
