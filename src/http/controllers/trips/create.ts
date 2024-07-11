import { InvalidTripEndDateError } from '@/use-cases/errors/invalid-trip-end-date-error'
import { InvalidTripStartDateError } from '@/use-cases/errors/invalid-trip-start-date-error'
import { makeCreateTripUseCase } from '@/use-cases/factories/make-create-trip-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    destination: z.string().min(4),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
  })

  const body = bodySchema.parse(request.body)

  try {
    const createGymUseCase = makeCreateTripUseCase()

    const { tripId } = await createGymUseCase.execute(body)

    reply.status(201).send({ tripId })
  } catch (err) {
    if (err instanceof InvalidTripStartDateError) {
      reply.code(400).send({
        error: err.message,
      })
    }

    if (err instanceof InvalidTripEndDateError) {
      reply.code(400).send({
        error: err.message,
      })
    }

    reply.code(500).send({
      error: 'Internal server error',
    })
  }
}
