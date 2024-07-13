import { relations } from 'drizzle-orm'
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

export const tripsRelations = relations(trips, ({ many }) => ({
  participants: many(participants),
}))

const insertTripsSchema = createInsertSchema(trips).omit({ id: true })
const selectTripsSchema = createSelectSchema(trips)

export type Trip = z.infer<typeof selectTripsSchema>
export type CreateTrip = z.input<typeof insertTripsSchema>

export const participants = pgTable('participants', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  isConfirmed: boolean('is_confirmed').notNull().default(false),
  isOwner: boolean('is_owner').notNull().default(false),
  tripId: text('trip_id')
    .references(() => trips.id, {
      onDelete: 'cascade',
    })
    .notNull(),
})

export const participantsRelations = relations(participants, ({ one }) => ({
  tripId: one(trips, {
    fields: [participants.tripId],
    references: [trips.id],
  }),
}))

const insertParticipantsSchema = createInsertSchema(participants).omit({
  id: true,
})
const selectParticipantsSchema = createSelectSchema(participants)

export type Participant = z.infer<typeof selectParticipantsSchema>
export type CreateParticipant = z.input<typeof insertParticipantsSchema>
