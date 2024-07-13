import type { CreateTrip } from '@/db/schema'

export type TripsRepositoryResponse = {
  tripId: string
}

export type TripsRepositoryRequest = CreateTrip & {
  ownerName: string
  ownerEmail: string
  emailsToInvite: string[]
}

export interface TripsRepository {
  create(trip: TripsRepositoryRequest): Promise<TripsRepositoryResponse>
}
