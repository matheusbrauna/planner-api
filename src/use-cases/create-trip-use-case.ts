import type { CreateTrip } from '@/db/schema'
import type { TripsRepository } from '@/repositories/trips-repository'
import dayjs from 'dayjs'
import { InvalidTripStartDateError } from '@/use-cases/errors/invalid-trip-start-date-error'
import { InvalidTripEndDateError } from '@/use-cases/errors/invalid-trip-end-date-error'

type CreateTripUseCaseRequest = CreateTrip

type CreateTripUseCaseResponse = {
  tripId: string
}

export class CreateTripUseCase {
  constructor(private tripRepository: TripsRepository) {}

  async execute(
    input: CreateTripUseCaseRequest,
  ): Promise<CreateTripUseCaseResponse> {
    if (dayjs(input.startsAt).isBefore(new Date())) {
      throw new InvalidTripStartDateError()
    }

    if (dayjs(input.endsAt).isBefore(input.startsAt)) {
      throw new InvalidTripEndDateError()
    }

    const { tripId } = await this.tripRepository.create(input)

    return {
      tripId,
    }
  }
}
