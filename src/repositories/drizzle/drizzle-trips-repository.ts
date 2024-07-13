import type {
  TripsRepository,
  TripsRepositoryRequest,
  TripsRepositoryResponse,
} from '@/repositories/trips-repository'
import { db } from '@/db/drizzle'
import { createId } from '@paralleldrive/cuid2'
import { participants, trips } from '@/db/schema'

export class DrizzleTripsRepository implements TripsRepository {
  async create(
    input: TripsRepositoryRequest,
  ): Promise<TripsRepositoryResponse> {
    const { tripId } = await db.transaction(async (tx) => {
      const result = await tx
        .insert(trips)
        .values({
          id: createId(),
          destination: input.destination,
          startsAt: input.startsAt,
          endsAt: input.endsAt,
        })
        .returning({
          tripId: trips.id,
        })

      await tx.insert(participants).values([
        {
          id: createId(),
          name: input.ownerName,
          email: input.ownerEmail,
          isOwner: true,
          isConfirmed: true,
          tripId: result[0].tripId,
        },
        ...input.emailsToInvite.map((email) => ({
          id: createId(),
          tripId: result[0].tripId,
          email,
        })),
      ])

      return { tripId: result[0].tripId }
    })

    return {
      tripId,
    }
  }
}
