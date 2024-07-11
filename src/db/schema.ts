import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type z from 'zod'

export const trips = pgTable('trips', {
  id: text('id').primaryKey(),
  destination: text('name').notNull(),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  isConfirmed: boolean('is_confirmed').notNull().default(false),
})

export const insertTripsSchema = createInsertSchema(trips).omit({ id: true })
export const selectTripsSchema = createSelectSchema(trips)

export type Trip = z.infer<typeof selectTripsSchema>
export type CreateTrip = z.input<typeof insertTripsSchema>
