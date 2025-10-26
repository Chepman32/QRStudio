/**
 * Code Model - WatermelonDB model for QR/Barcode
 */

import {Model, Q} from '@nozbe/watermelondb';
import {field, readonly, date, json} from '@nozbe/watermelondb/decorators';
import {CodeType} from '@/types';

export default class Code extends Model {
  static table = 'codes';

  @field('type') type!: CodeType;
  @field('data') data!: string;
  @field('title') title?: string;
  @field('color') color!: string;
  @field('background_color') backgroundColor!: string;
  @field('size') size!: number;
  @field('error_correction_level') errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  @field('logo') logo?: string;
  @json('tags', tags => tags || []) tags!: string[];
  @field('folder_id') folderId?: string;
  @field('is_favorite') isFavorite!: boolean;
  @field('usage_count') usageCount!: number;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  // Queries
  static async findByData(data: string) {
    return await this.query(Q.where('data', data)).fetch();
  }

  static async findByFolder(folderId: string) {
    return await this.query(Q.where('folder_id', folderId)).fetch();
  }

  static async findFavorites() {
    return await this.query(Q.where('is_favorite', true)).fetch();
  }

  static async searchCodes(query: string) {
    return await this.query(
      Q.or(
        Q.where('data', Q.like(`%${Q.sanitizeLikeString(query)}%`)),
        Q.where('title', Q.like(`%${Q.sanitizeLikeString(query)}%`)),
      ),
    ).fetch();
  }
}
