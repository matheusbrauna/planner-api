import type {
  TripsRepository,
  TripsRepositoryResponse,
  TripsRepositoryRequest,
} from '@/repositories/trips-repository'

export class InMemoryTripsRepository implements TripsRepository {
  private trips: Map<string, TripsRepositoryRequest> = new Map()

  async create(trip: TripsRepositoryRequest): Promise<TripsRepositoryResponse> {
    const tripId = (Math.random() * 100000).toFixed(0)
    this.trips.set(tripId, trip)
    return {
      tripId,
    }
  }

  getTrips(): Map<string, TripsRepositoryRequest> {
    return this.trips
  }
}
