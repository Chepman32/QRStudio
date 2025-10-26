/**
 * Database Configuration - WatermelonDB setup
 */

import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {schema} from './schema';
import Code from './models/Code';
import Folder from './models/Folder';
import Purchase from './models/Purchase';

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'qrstudio',
  jsi: true, // Use JSI for better performance
});

export const database = new Database({
  adapter,
  modelClasses: [Code, Folder, Purchase],
});

export {Code, Folder, Purchase};
