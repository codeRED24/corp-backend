import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';

@Injectable()
export class CouponUsageService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createCouponUsageDto: CreateCouponUsageDto) {
    const result = await this.db
      .insertInto('coupon_usages')
      .values(createCouponUsageDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return result;
  }

  async findAll() {
    return await this.db.selectFrom('coupon_usages').selectAll().execute();
  }

  async findOne(id: number) {
    const usage = await this.db
      .selectFrom('coupon_usages')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (!usage) {
      throw new NotFoundException(`Coupon usage not found`);
    }
    return usage;
  }

  async update(id: number, updateCouponUsageDto: UpdateCouponUsageDto) {
    const result = await this.db
      .updateTable('coupon_usages')
      .set({ ...updateCouponUsageDto })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Coupon usage not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.db
      .deleteFrom('coupon_usages')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Coupon usage not found`);
    }
    return { message: `Coupon usage deleted` };
  }
}
