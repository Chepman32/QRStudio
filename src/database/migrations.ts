/**
 * Database Migrations - Schema versioning
 */

import {schemaMigrations, addColumns, createTable} from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
  migrations: [
    // Initial schema is version 1, future migrations go here
    // Example migration for version 2:
    // {
    //   toVersion: 2,
    //   steps: [
    //     addColumns({
    //       table: 'codes',
    //       columns: [
    //         { name: 'new_field', type: 'string', isOptional: true },
    //       ],
    //     }),
    //   ],
    // },
  ],
});
