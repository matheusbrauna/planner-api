import { env } from '@/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pg = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(pg)
