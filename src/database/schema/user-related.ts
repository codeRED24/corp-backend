import {
  pgTable,
  serial,
  varchar,
  timestamp,
  jsonb,
  boolean,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';
import { product_variants, products } from './product-related';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  user_type: varchar('user_type', { length: 15 }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  address: jsonb('address'),
  is_verified: boolean('is_verified').default(false),
  is_premium: boolean('is_premium').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
  last_login: timestamp('last_login').defaultNow(),
});

export const wishlists = pgTable('wishlists', {
  id: serial('id').primaryKey(),
  users: integer('users')
    .notNull()
    .references(() => users.id),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const carts = pgTable('carts', {
  cart_id: serial('cart_id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  variant_id: integer('variant_id')
    .notNull()
    .references(() => product_variants.variant_id),
  quantity: integer('quantity').notNull().default(1),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
  order_id: serial('order_id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  total_price: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  order_date: timestamp('order_date').defaultNow(),
  status: varchar('status', { length: 50 }),
  shipping_address: jsonb('shipping_address').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const order_items = pgTable('order_items', {
  order_item_id: serial('order_item_id').primaryKey(),
  order_id: integer('order_id')
    .notNull()
    .references(() => orders.order_id),
  product_id: integer('product_id')
    .notNull()
    .references(() => products.product_id),
  variant_id: integer('variant_id')
    .notNull()
    .references(() => product_variants.variant_id),
  quantity: integer('quantity').notNull().default(1),
  sold_at_price: decimal('sold_at_price', {
    precision: 10,
    scale: 2,
  }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const payments = pgTable('payments', {
  payment_id: serial('payment_id').primaryKey(),
  order_id: integer('order_id')
    .notNull()
    .references(() => orders.order_id),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  payment_method: varchar('payment_method', { length: 50 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  transaction_id: varchar('transaction_id', { length: 255 }),
  created_at: timestamp('created_at').defaultNow(),
});

export const saved_addresses = pgTable('saved_addresses', {
  saved_address_id: serial('saved_address_id').primaryKey(),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  house_number: varchar('house_number', { length: 255 }).notNull(),
  street_name: varchar('street_name', { length: 255 }).notNull(),
  city: varchar('city', { length: 50 }).notNull(),
  state: varchar('state', { length: 50 }).notNull(),
  zip_code: varchar('zip_code', { length: 6 }).notNull(),
  country: varchar('country', { length: 50 }).notNull(),
  latitude: decimal('latitude', { precision: 9, scale: 6 }).notNull(),
  longitude: decimal('longitude', { precision: 9, scale: 6 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const vendor = pgTable('vendor', {
  vendor_id: serial('vendor_id').primaryKey(),
  vendor_name: varchar('vendor_name', { length: 255 }).notNull(),
  vendor_gst_number: varchar('vendor_gst_number', { length: 255 }).notNull(),
  vendor_address: varchar('vendor_address', { length: 255 }).notNull(),
  vendor_latitude: decimal('vendor_latitude', {
    precision: 9,
    scale: 6,
  }).notNull(),
  vendor_longitude: decimal('vendor_longitude', {
    precision: 9,
    scale: 6,
  }).notNull(),
  pin_code: varchar('pin_code', { length: 6 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
