import type { CreateTrip } from '@/db/schema'
import { InMemoryTripsRepository } from '@/repositories/in-memory/in-memory-trips-repository'
import dayjs from 'dayjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateTripUseCase } from './create-trip-use-case'
import { InvalidTripStartDateError } from './errors/invalid-trip-start-date-error'
import { InvalidTripEndDateError } from './errors/invalid-trip-end-date-error'

describe('CreateTripUseCase', () => {
  let tripsRepository: InMemoryTripsRepository
  let createTripUseCase: CreateTripUseCase

  beforeEach(() => {
    tripsRepository = new InMemoryTripsRepository()
    createTripUseCase = new CreateTripUseCase(tripsRepository)
  })

  it('should create a trip successfully', async () => {
    const input: CreateTrip = {
      destination: 'Paris',
      startsAt: dayjs().add(1, 'day').toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
      createdAt: dayjs().toDate(),
      isConfirmed: false,
    }

    const response = await createTripUseCase.execute(input)

    expect(response).toHaveProperty('tripId')
    expect(tripsRepository.getTrips().size).toBe(1)
  })

  it('should throw an error if trip start date is in the past', async () => {
    const input: CreateTrip = {
      destination: 'Paris',
      startsAt: dayjs().subtract(1, 'day').toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
      createdAt: dayjs().toDate(),
      isConfirmed: false,
    }

    await expect(createTripUseCase.execute(input)).rejects.toBeInstanceOf(
      InvalidTripStartDateError,
    )
  })

  it('should throw an error if trip end date is before the start date', async () => {
    const input: CreateTrip = {
      destination: 'Paris',
      startsAt: dayjs().add(2, 'days').toDate(),
      endsAt: dayjs().add(1, 'day').toDate(),
      createdAt: dayjs().toDate(),
      isConfirmed: false,
    }

    await expect(createTripUseCase.execute(input)).rejects.toBeInstanceOf(
      InvalidTripEndDateError,
    )
  })
})
