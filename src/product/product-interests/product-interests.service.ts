import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DB } from 'src/database/generated-types';
import { Kysely } from 'kysely';
import { CreateProductInterestDto } from './dto/create-product-interest.dto';
import { UpdateProductInterestDto } from './dto/update-product-interest.dto';

@Injectable()
export class ProductInterestsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createProductInterestDto: CreateProductInterestDto) {
    const newUserInterest = await this.db
      .insertInto('product_interest_list')
      .values(createProductInterestDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return newUserInterest;
  }

  async findAll() {
    const userInterests = await this.db
      .selectFrom('product_interest_list')
      .selectAll()
      .execute();
    return userInterests;
  }

  async findOne(id: number) {
    const userInterest = await this.db
      .selectFrom('product_interest_list')
      .selectAll()
      .where('product_interest_list_id', '=', id)
      .executeTakeFirst();
    if (!userInterest) {
      throw new NotFoundException(`Product interest not found`);
    }
  }

  async update(id: number, updateProductInterestDto: UpdateProductInterestDto) {
    const userInterest = await this.db
      .updateTable('product_interest_list')
      .set({ ...updateProductInterestDto, updated_at: new Date() })
      .where('product_interest_list_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!userInterest) {
      throw new NotFoundException(`Product interest not found`);
    }
    return userInterest;
  }

  async remove(id: number) {
    const userInterest = await this.db
      .deleteFrom('product_interest_list')
      .where('product_interest_list_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!userInterest) {
      throw new NotFoundException(`Product interest not found`);
    }
    return { message: `Product interest deleted` };
  }
}
