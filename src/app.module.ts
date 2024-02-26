// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ProductModule } from './products/products.module';
// import * as schema from '../db/schema';
// import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
// const DATABASE_CONNECTION_URL = "postgres://postgres:5057@localhost:5433/nestTask";

// @Module({
//   imports: [
//     ProductModule,
//     DrizzlePGModule.register({
//       tag: 'DB_PROD',
//       pg: {
//         connection: 'client',
//         config: {
//           connectionString: DATABASE_CONNECTION_URL,
//         },
//       },
//       config: { schema: { ...schema } },
//     }),
//   ],
//   // imports: [ProductModule],

//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/products.module';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import * as schema from '../db/schema';

const DATABASE_CONNECTION_URL = "postgres://postgres:5057@localhost:5433/nestTask";

@Module({
  imports: [
    ProductModule,
    DrizzlePGModule.register({
      tag: 'DB_PROD',
      pg: {
        connection: 'client',
        config: {
          connectionString: DATABASE_CONNECTION_URL,
        },
      },
      config: { schema: { ...schema } },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

