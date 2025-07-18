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
import { orders, users } from './user-related';

export const interest_types = pgTable('interest_type', {
  interest_id: serial('interest_id').primaryKey(),
  interest_name: varchar('interest_name', { length: 255 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const coupons = pgTable('coupons', {
  coupon_id: serial('coupon_id').primaryKey(),
  coupon_code: varchar('coupon_code', { length: 50 }).notNull(),
  description: text('description'),
  discount_type: varchar('discount_type', { length: 50 }).notNull(),
  discount_value: decimal('discount_value', {
    precision: 10,
    scale: 2,
  }).notNull(),
  min_order_value: decimal('min_order_value', {
    precision: 10,
    scale: 2,
  }).default('0.00'),
  max_discount_value: decimal('max_discount_value', {
    precision: 10,
    scale: 2,
  }),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  usage_limit: integer('usage_limit').default(0),
  is_active: boolean('is_active').default(true),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const coupon_usages = pgTable('coupon_usages', {
  id: serial('id').primaryKey(),
  coupon_id: integer('coupon_id')
    .notNull()
    .references(() => coupons.coupon_id),
  user_id: integer('user_id')
    .notNull()
    .references(() => users.id),
  order_id: integer('order_id')
    .notNull()
    .references(() => orders.order_id),
  used_at: timestamp('used_at').defaultNow(),
});
