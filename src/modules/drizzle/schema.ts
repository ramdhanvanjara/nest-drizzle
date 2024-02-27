import { relations } from 'drizzle-orm';
import { serial, pgTable, varchar, integer } from 'drizzle-orm/pg-core';
// import { relations } from 'drizzle-orm';



export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: varchar('description', { length: 256 }),
  price: integer('price')
});

// export const countries = pgTable('countries', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
// });
// export const cities = pgTable('cities', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
//   countryId: integer('country_id').references(() => countries.id),
// });

// export const cityRelation = relations(cities, ({ one }) => ({
//   country_city: one(countries, {
//     fields: [cities.countryId],
//     references: [countries.id],
//   }),
// }));
