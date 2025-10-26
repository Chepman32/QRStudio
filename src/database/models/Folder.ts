/**
 * Folder Model - WatermelonDB model for folders
 */

import {Model} from '@nozbe/watermelondb';
import {field, readonly, date} from '@nozbe/watermelondb/decorators';

export default class Folder extends Model {
  static table = 'folders';

  @field('name') name!: string;
  @field('icon') icon!: string;
  @field('color') color!: string;
  @field('item_count') itemCount!: number;
  @readonly @date('created_at') createdAt!: Date;
}
