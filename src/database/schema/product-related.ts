import {
  boolean,
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { interest_types } from './extra';

export const categories = pgTable('categories', {
  category_id: serial('category_id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parent_id: integer('parent_id').references(() => categories.category_id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const products = pgTable('products', {
  product_id: serial('product_id').primaryKey(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.category_id),
  name: varchar('name', { length: 500 }).notNull(),
  description: text('description'),
  base_price: decimal('base_price', { precision: 10, scale: 2 }).notNull(),
  is_active: boolean('is_active').default(true),
  primary_interest: integer('primary_interest')
    .notNull()
    .references(() => interest_types.interest_id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const product_specifications = pgTable('product_specifications', {
  spec_id: serial('spec_id').primaryKey(),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  attribute_name: varchar('attribute_name', { length: 255 }).notNull(),
  attribute_value: varchar('attribute_value', { length: 255 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const product_variants = pgTable('product_variants', {
  variant_id: serial('variant_id').primaryKey(),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  dimensions: varchar('dimensions', { length: 80 }),
  color: varchar('color', { length: 80 }),
  color_code: varchar('color_code', { length: 15 }),
  weight_in_gm: decimal('weight_in_gm', { precision: 4, scale: 2 }),
  sku: varchar('sku', { length: 100 }).unique(),
  in_stock: integer('in_stock').default(0),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discount_amount: decimal('discount_amount', { precision: 10, scale: 2 }),
  discount_percentage: decimal('discount_percentage', {
    precision: 10,
    scale: 2,
  }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const variant_specifications = pgTable('variant_specifications', {
  variant_spec_id: serial('variant_spec_id').primaryKey(),
  variant_id: integer('variant_id')
    .notNull()
    .references(() => product_variants.variant_id),
  attribute_name: varchar('attribute_name', { length: 255 }).notNull(),
  attribute_value: varchar('attribute_value', { length: 255 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
