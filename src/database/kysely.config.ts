import { Injectable } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from '../database/generated-types';

@Injectable()
export class KyselyConfig extends Kysely<DB> {
  constructor() {
    super({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.DB_HOST ?? '',
          port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME ?? '',
        }),
      }),
    });
  }
}
