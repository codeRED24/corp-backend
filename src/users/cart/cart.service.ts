import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart-item.dto';
import { AddToCartDTO } from './dto/add-to-cart.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class CartService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(addToCart: AddToCartDTO) {
    return await this.db
      .insertInto('carts')
      .values(addToCart)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findOne(id: number) {
    return await this.db
      .selectFrom('carts')
      .innerJoin('products', 'carts.product_id', 'products.product_id')
      .innerJoin(
        'product_variants',
        'carts.variant_id',
        'product_variants.variant_id',
      )
      .selectAll()
      .where('carts.user_id', '=', id)
      .execute();
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const result = await this.db
      .updateTable('carts')
      .set({ ...updateCartDto, updated_at: new Date() })
      .where('carts.user_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Cart not found`);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.db
      .deleteFrom('carts')
      .where('carts.variant_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!result) {
      throw new NotFoundException(`Item not found in cart`);
    }
    return { message: `Item removed from cart` };
  }
}
