CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(256),
	"price" integer
);
--> statement-breakpoint
DROP TABLE "countries";