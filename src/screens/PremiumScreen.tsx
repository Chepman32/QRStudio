/**
 * Premium Screen - IAP upgrade
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, IAPProduct} from '@/types';
import {iapService} from '@/services';
import {useSettingsStore, useUIStore} from '@/store';
import {AnimatedButton, LoadingSpinner} from '@/components';
import {colors, spacing, typography} from '@/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Premium'>;

export const PremiumScreen: React.FC<Props> = ({navigation}) => {
  const {setPro} = useSettingsStore();
  const {showToast} = useUIStore();
  const [products, setProducts] = useState<IAPProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await iapService.getAvailableProducts();
    if (result.success && result.data) {
      setProducts(result.data);
    }
    setLoading(false);
  };

  const handlePurchase = async (productId: string) => {
    const result = await iapService.purchaseProduct(productId);
    if (result.success) {
      setPro(true);
      showToast('Purchase successful!', 'success');
      navigation.goBack();
    } else {
      showToast('Purchase failed', 'error');
    }
  };

  const handleRestore = async () => {
    const result = await iapService.restorePurchases();
    if (result.success && result.data && result.data.length > 0) {
      setPro(true);
      showToast('Purchases restored', 'success');
      navigation.goBack();
    } else {
      showToast('No purchases to restore', 'info');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <LoadingSpinner />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Upgrade to Pro</Text>
        <Text style={styles.subtitle}>
          Unlock all features and support development
        </Text>

        <View style={styles.features}>
          <Feature text="Unlimited QR codes" />
          <Feature text="Batch export to PDF" />
          <Feature text="Custom branding" />
          <Feature text="Advanced analytics" />
          <Feature text="Priority support" />
          <Feature text="Offline sync" />
        </View>

        {products.map(product => (
          <View key={product.productId} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.localizedPrice}</Text>
            </View>
            <AnimatedButton
              title="Purchase"
              onPress={() => handlePurchase(product.productId)}
              variant="primary"
              accessibilityLabel={`Purchase ${product.title}`}
            />
          </View>
        ))}

        <AnimatedButton
          title="Restore Purchases"
          onPress={handleRestore}
          variant="ghost"
          style={styles.restoreButton}
          accessibilityLabel="Restore previous purchases"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Feature: React.FC<{text: string}> = ({text}) => (
  <View style={styles.feature}>
    <Text style={styles.featureIcon}>✓</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background.default,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing[6],
  },
  title: {
    ...typography.h1,
    color: colors.light.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body1,
    color: colors.light.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[8],
  },
  features: {
    marginBottom: spacing[8],
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  featureIcon: {
    fontSize: 20,
    color: colors.success.main,
    marginRight: spacing[3],
  },
  featureText: {
    ...typography.body1,
    color: colors.light.text.primary,
  },
  productCard: {
    backgroundColor: colors.light.background.paper,
    borderRadius: spacing[3],
    padding: spacing[5],
    marginBottom: spacing[4],
  },
  productInfo: {
    marginBottom: spacing[4],
  },
  productTitle: {
    ...typography.h3,
    color: colors.light.text.primary,
    marginBottom: spacing[1],
  },
  productPrice: {
    ...typography.h4,
    color: colors.primary[600],
  },
  restoreButton: {
    marginTop: spacing[4],
  },
});
