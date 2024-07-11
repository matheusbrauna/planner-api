import { DrizzleTripsRepository } from '@/repositories/drizzle/drizzle-trips-repository'
import { CreateTripUseCase } from '@/use-cases/create-trip-use-case'

export function makeCreateTripUseCase() {
  const tripRepository = new DrizzleTripsRepository()
  const useCase = new CreateTripUseCase(tripRepository)

  return useCase
}
