/**
 * IAP Service - In-App Purchase management
 * Handles consumables, non-consumables, and subscriptions
 */

import {
  initConnection,
  purchaseUpdatedListener,
  purchaseErrorListener,
  getProducts,
  requestPurchase,
  finishTransaction,
  getPurchaseHistory,
  PurchaseError,
  Purchase as IAPPurchase,
  Product,
} from 'react-native-iap';
import {IAPProduct, ServiceResponse} from '@/types';
import {Platform} from 'react-native';

// Product IDs
const PRODUCT_IDS = {
  PRO_UNLOCK: Platform.select({
    ios: 'com.qrstudio.pro',
    android: 'com.qrstudio.pro',
  }) as string,
  PREMIUM_PACK_1: Platform.select({
    ios: 'com.qrstudio.premium.pack1',
    android: 'com.qrstudio.premium.pack1',
  }) as string,
  PREMIUM_PACK_2: Platform.select({
    ios: 'com.qrstudio.premium.pack2',
    android: 'com.qrstudio.premium.pack2',
  }) as string,
};

export class IAPService {
  private purchaseUpdateSubscription: any;
  private purchaseErrorSubscription: any;
  private products: Product[] = [];

  /**
   * Initialize IAP connection
   */
  async initialize(): Promise<ServiceResponse<void>> {
    try {
      await initConnection();
      await this.loadProducts();
      this.setupListeners();
      return {success: true};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Load available products
   */
  private async loadProducts(): Promise<void> {
    const productIds = Object.values(PRODUCT_IDS);
    this.products = await getProducts({skus: productIds});
  }

  /**
   * Get available products
   */
  async getAvailableProducts(): Promise<ServiceResponse<IAPProduct[]>> {
    try {
      if (this.products.length === 0) {
        await this.loadProducts();
      }

      const iapProducts: IAPProduct[] = this.products.map(p => ({
        productId: p.productId,
        title: p.title,
        description: p.description,
        price: p.price,
        localizedPrice: p.localizedPrice,
        currency: p.currency,
        type: 'non-consumable',
      }));

      return {success: true, data: iapProducts};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Purchase product
   */
  async purchaseProduct(productId: string): Promise<ServiceResponse<IAPPurchase>> {
    try {
      const purchase = await requestPurchase({sku: productId});
      return {success: true, data: purchase as IAPPurchase};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Restore purchases
   */
  async restorePurchases(): Promise<ServiceResponse<IAPPurchase[]>> {
    try {
      const purchases = await getPurchaseHistory();
      return {success: true, data: purchases as IAPPurchase[]};
    } catch (error) {
      return {success: false, error: error as Error};
    }
  }

  /**
   * Check if user has Pro
   */
  async isPro(): Promise<boolean> {
    try {
      const history = await getPurchaseHistory();
      return history.some(p => p.productId === PRODUCT_IDS.PRO_UNLOCK);
    } catch {
      return false;
    }
  }

  /**
   * Setup purchase listeners
   */
  private setupListeners(): void {
    this.purchaseUpdateSubscription = purchaseUpdatedListener(async purchase => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        try {
          await finishTransaction({purchase, isConsumable: false});
          // Handle successful purchase
        } catch (error) {
          console.error('Failed to finish transaction:', error);
        }
      }
    });

    this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
      console.warn('Purchase error:', error);
    });
  }

  /**
   * Cleanup
   */
  async cleanup(): Promise<void> {
    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
    }
  }
}

export const iapService = new IAPService();
