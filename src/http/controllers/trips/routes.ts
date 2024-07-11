import type { FastifyInstance } from 'fastify'
import { create } from '@/http/controllers/trips/create'

export async function tripsRoutes(app: FastifyInstance) {
  app.post('/trips', create)
}
