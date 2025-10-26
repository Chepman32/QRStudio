/**
 * Home Screen - Main dashboard
 */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/types';
import {useCodeStore, useFolderStore} from '@/store';
import {AnimatedButton, AnimatedCard, QRCodeDisplay} from '@/components';
import {colors, spacing, typography, shadows} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {codes, getFilteredCodes} = useCodeStore();
  const {folders} = useFolderStore();

  const recentCodes = getFilteredCodes().slice(0, 6);
  const favoriteCount = codes.filter(c => c.isFavorite).length;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Settings"
          accessibilityRole="button">
          <Text style={styles.headerButton}>⚙️</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.title}>QR Studio</Text>
          <Text style={styles.subtitle}>
            Create and manage QR codes offline
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <AnimatedButton
              title="New QR Code"
              onPress={() => navigation.navigate('Editor', {type: 'QR'})}
              variant="primary"
              fullWidth
              accessibilityLabel="Create new QR code"
              accessibilityHint="Opens the editor to create a new QR code"
            />
            <View style={styles.buttonRow}>
              <View style={styles.halfButton}>
                <AnimatedButton
                  title="Library"
                  onPress={() => navigation.navigate('Library', {})}
                  variant="secondary"
                  fullWidth
                  accessibilityLabel="View library"
                />
              </View>
              <View style={styles.halfButton}>
                <AnimatedButton
                  title="Scanner"
                  onPress={() => navigation.navigate('Scanner')}
                  variant="ghost"
                  fullWidth
                  accessibilityLabel="Open scanner"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <AnimatedCard style={styles.statCard}>
              <Text style={styles.statValue}>{codes.length}</Text>
              <Text style={styles.statLabel}>Total Codes</Text>
            </AnimatedCard>
            <AnimatedCard style={styles.statCard}>
              <Text style={styles.statValue}>{favoriteCount}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </AnimatedCard>
            <AnimatedCard style={styles.statCard}>
              <Text style={styles.statValue}>{folders.length}</Text>
              <Text style={styles.statLabel}>Folders</Text>
            </AnimatedCard>
          </View>
        </View>

        {/* Recent Codes */}
        {recentCodes.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Library', {})}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentCodesScroll}>
              {recentCodes.map(code => (
                <AnimatedCard
                  key={code.id}
                  style={styles.codeCard}
                  onPress={() =>
                    navigation.navigate('Editor', {codeId: code.id})
                  }>
                  <QRCodeDisplay
                    code={code}
                    size={120}
                    showBackground={false}
                  />
                  <Text style={styles.codeTitle} numberOfLines={1}>
                    {code.title || code.data}
                  </Text>
                </AnimatedCard>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Premium Prompt */}
        <AnimatedCard
          style={styles.premiumCard}
          onPress={() => navigation.navigate('Premium')}>
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>✨ Upgrade to Pro</Text>
            <Text style={styles.premiumText}>
              Unlock unlimited codes, batch export, and premium features
            </Text>
          </View>
        </AnimatedCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing[10],
  },
  headerButton: {
    fontSize: 24,
    marginRight: spacing[2],
  },
  hero: {
    padding: spacing[6],
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.light.text.primary,
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body1,
    color: colors.light.text.secondary,
    textAlign: 'center',
  },
  section: {
    marginTop: spacing[6],
    paddingHorizontal: spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.light.text.primary,
  },
  seeAll: {
    ...typography.subtitle1,
    color: colors.primary[600],
  },
  quickActions: {
    gap: spacing[3],
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  halfButton: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing[4],
  },
  statValue: {
    ...typography.h2,
    color: colors.primary[600],
    marginBottom: spacing[1],
  },
  statLabel: {
    ...typography.caption,
    color: colors.light.text.secondary,
  },
  recentCodesScroll: {
    paddingRight: spacing[4],
    gap: spacing[3],
  },
  codeCard: {
    width: 140,
    alignItems: 'center',
    padding: spacing[3],
  },
  codeTitle: {
    ...typography.caption,
    color: colors.light.text.primary,
    marginTop: spacing[2],
    textAlign: 'center',
  },
  premiumCard: {
    margin: spacing[4],
    padding: spacing[5],
    backgroundColor: colors.primary[50],
  },
  premiumContent: {
    alignItems: 'center',
  },
  premiumTitle: {
    ...typography.h4,
    color: colors.primary[700],
    marginBottom: spacing[2],
  },
  premiumText: {
    ...typography.body2,
    color: colors.primary[600],
    textAlign: 'center',
  },
});
