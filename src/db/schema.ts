import { boolean } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const trips = pgTable('trips', {
  id: text('id').primaryKey(),
  destination: text('name').notNull(),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  isConfirmed: boolean('is_confirmed').notNull().default(false)
})