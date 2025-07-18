import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class CouponService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createCouponDto: CreateCouponDto) {
    const result = await this.db
      .insertInto('coupons')
      .values(createCouponDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return result;
  }

  async findAll() {
    return await this.db.selectFrom('coupons').selectAll().execute();
  }

  async findOne(id: number) {
    const coupon = await this.db
      .selectFrom('coupons')
      .selectAll()
      .where('coupon_id', '=', id)
      .executeTakeFirst();

    if (!coupon) {
      throw new NotFoundException(`Coupon not found`);
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const result = await this.db
      .updateTable('coupons')
      .set(updateCouponDto)
      .where('coupon_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Coupon not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.db
      .deleteFrom('coupons')
      .where('coupon_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Coupon not found`);
    }
    return { message: `Coupon deleted` };
  }
}
