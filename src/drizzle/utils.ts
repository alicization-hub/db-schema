import { timestamp } from 'drizzle-orm/pg-core'

export const sharedTimestampConumns = {
  createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).$onUpdate(() => new Date())
}
