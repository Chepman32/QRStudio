/**
 * Purchase Model - WatermelonDB model for IAP purchases
 */

import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Purchase extends Model {
  static table = 'purchases';

  @field('product_id') productId!: string;
  @field('transaction_id') transactionId!: string;
  @readonly @date('transaction_date') transactionDate!: Date;
  @field('is_active') isActive!: boolean;
}
