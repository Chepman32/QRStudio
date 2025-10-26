/**
 * WatermelonDB Schema - Offline-first database schema
 */

import {appSchema, tableSchema} from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'codes',
      columns: [
        {name: 'type', type: 'string'},
        {name: 'data', type: 'string', isIndexed: true},
        {name: 'title', type: 'string', isOptional: true},
        {name: 'color', type: 'string'},
        {name: 'background_color', type: 'string'},
        {name: 'size', type: 'number'},
        {name: 'error_correction_level', type: 'string', isOptional: true},
        {name: 'logo', type: 'string', isOptional: true},
        {name: 'tags', type: 'string', isOptional: true}, // JSON array
        {name: 'folder_id', type: 'string', isOptional: true, isIndexed: true},
        {name: 'is_favorite', type: 'boolean'},
        {name: 'usage_count', type: 'number'},
        {name: 'created_at', type: 'number', isIndexed: true},
        {name: 'updated_at', type: 'number'},
      ],
    }),
    tableSchema({
      name: 'folders',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'icon', type: 'string'},
        {name: 'color', type: 'string'},
        {name: 'item_count', type: 'number'},
        {name: 'created_at', type: 'number', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'purchases',
      columns: [
        {name: 'product_id', type: 'string', isIndexed: true},
        {name: 'transaction_id', type: 'string'},
        {name: 'transaction_date', type: 'number'},
        {name: 'is_active', type: 'boolean'},
      ],
    }),
  ],
});
