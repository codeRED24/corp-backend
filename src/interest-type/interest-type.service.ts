import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class InterestTypeService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createInterestTypeDto: CreateInterestTypeDto) {
    const result = await this.db
      .insertInto('interest_type')
      .values(createInterestTypeDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return result;
  }

  async findAll() {
    return await this.db.selectFrom('interest_type').selectAll().execute();
  }

  async findOne(id: number) {
    const interest_type = await this.db
      .selectFrom('interest_type')
      .selectAll()
      .where('interest_id', '=', id)
      .executeTakeFirst();
    if (!interest_type) {
      throw new NotFoundException(`Interest Type not found`);
    }
    return interest_type;
  }

  async update(id: number, updateInterestTypeDto: UpdateInterestTypeDto) {
    const result = await this.db
      .updateTable('interest_type')
      .set({ ...updateInterestTypeDto, updated_at: new Date() })
      .where('interest_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Interest Type not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.db
      .deleteFrom('interest_type')
      .where('interest_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Interest Type not found`);
    }
    return { message: `Coupon deleted` };
  }
}
