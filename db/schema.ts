import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey(),
  reference: text('reference').notNull().unique(),
  service: text('service').notNull(),
  date: text('date').notNull(),
  time: text('time').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  notes: text('notes').notNull().default(''),
  status: text('status').notNull().default('requested'),
  createdAt: text('created_at').notNull(),
}, table => [index('idx_bookings_date_time').on(table.date, table.time)]);
