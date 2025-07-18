import {
  integer,
  pgTable,
  primaryKey,
  serial,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './user-related';
import { interest_types } from './extra';
import { products } from './product-related';

export const user_insterest_list = pgTable(
  'user_interest_list',
  {
    user_interest_list_id: serial('user_interest_list_id'),
    user_id: integer('user_id')
      .notNull()
      .references(() => users.id),
    interest_id: integer('interest_id')
      .notNull()
      .references(() => interest_types.interest_id),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  (table) => [
    primaryKey({
      columns: [table.user_id, table.interest_id],
    }),
  ],
);

export const product_interest_list = pgTable(
  'product_interest_list',
  {
    product_interest_list_id: serial('product_interest_list_id'),
    product_id: integer('product_id')
      .notNull()
      .references(() => products.product_id),
    interest_id: integer('interest_id')
      .notNull()
      .references(() => interest_types.interest_id),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
  },
  (table) => [
    primaryKey({
      columns: [table.product_id, table.interest_id],
    }),
  ],
);
