import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInterestDto } from './dto/create-user-interest.dto';
import { UpdateUserInterestDto } from './dto/update-user-interest.dto';
import { DB } from 'src/database/generated-types';
import { Kysely } from 'kysely';

@Injectable()
export class UserInterestsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createUserInterestDto: CreateUserInterestDto) {
    const newUserInterest = await this.db
      .insertInto('user_interest_list')
      .values(createUserInterestDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return newUserInterest;
  }

  async findAll() {
    const userInterests = await this.db
      .selectFrom('user_interest_list')
      .selectAll()
      .execute();
    return userInterests;
  }

  async findOne(id: number) {
    const userInterest = await this.db
      .selectFrom('user_interest_list')
      .selectAll()
      .where('interest_id', '=', id)
      .executeTakeFirst();
    if (!userInterest) {
      throw new NotFoundException(`User interest not found`);
    }
  }

  async update(id: number, updateUserInterestDto: UpdateUserInterestDto) {
    const userInterest = await this.db
      .updateTable('user_interest_list')
      .set({ ...updateUserInterestDto, updated_at: new Date() })
      .where('interest_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!userInterest) {
      throw new NotFoundException(`User interest not found`);
    }
    return userInterest;
  }

  async remove(id: number) {
    const userInterest = await this.db
      .deleteFrom('user_interest_list')
      .where('interest_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!userInterest) {
      throw new NotFoundException(`User interest not found`);
    }
    return { message: `User interest deleted` };
  }
}
