import { integer, pgTable, serial,varchar } from 'drizzle-orm/pg-core';
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
// import postgres from 'postgres';

// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)

export const products = pgTable('products', {
  id: varchar('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 256 }),
  price: integer('price')
});

// CREATE TABLE IF NOT EXISTS "table" (
//     "int" integer
//   );