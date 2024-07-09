import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "@/env";

const pg = new Client({
  connectionString: env.DATABASE_URL,
});


export const db = drizzle(pg);
