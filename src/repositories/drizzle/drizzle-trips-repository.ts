import type {
  TripsRepository,
  TripsRepositoryRequest,
  TripsRepositoryResponse,
} from '@/repositories/trips-repository'
import { db } from '@/db/drizzle'
import { createId } from '@paralleldrive/cuid2'
import { trips } from '@/db/schema'

export class DrizzleTripsRepository implements TripsRepository {
  async create(
    input: TripsRepositoryRequest,
  ): Promise<TripsRepositoryResponse> {
    const [trip] = await db
      .insert(trips)
      .values({
        id: createId(),
        ...input,
      })
      .returning()

    return {
      tripId: trip.id,
    }
  }
}
