import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import dayjs from 'dayjs'

describe('Create trip (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a trip', async () => {
    const body = {
      destination: 'Paris',
      startsAt: dayjs().add(1, 'day').toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
    }

    const response = await request(app.server).post('/trips').send(body)

    expect(response.statusCode).toEqual(201)
  })

  it('should throw an Bad Request error if trip start date is in the past', async () => {
    const body = {
      destination: 'Paris',
      startsAt: dayjs().subtract(1, 'day').toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
    }

    const response = await request(app.server).post('/trips').send(body)

    expect(response.statusCode).toEqual(400)
  })

  it('should throw an Bad Request error if trip end date is before the start date', async () => {
    const body = {
      destination: 'Paris',
      startsAt: dayjs().subtract(1, 'day').toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
    }

    const response = await request(app.server).post('/trips').send(body)

    expect(response.statusCode).toEqual(400)
  })
})
