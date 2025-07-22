import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class OrderItemsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    const variantPrice = await this.db
      .selectFrom('product_variants')
      .innerJoin(
        'products',
        'product_variants.product_id',
        'products.product_id',
      )
      .select('product_variants.price')
      .where('product_variants.variant_id', '=', createOrderItemDto.variant_id)
      .where('products.is_active', '=', true)
      .executeTakeFirstOrThrow();

    if (!variantPrice) {
      throw new NotFoundException('Variant not found');
    }

    const newOrderItem = await this.db
      .insertInto('order_items')
      .values({
        ...createOrderItemDto,
        sold_at_price: Number(variantPrice.price),
      })
      .returningAll()
      .executeTakeFirstOrThrow();
    return newOrderItem;
  }

  async findAll() {
    return await this.db.selectFrom('order_items').selectAll().execute();
  }

  async findOne(id: number) {
    const orderItem = await this.db
      .selectFrom('order_items')
      .selectAll()
      .where('order_item_id', '=', id)
      .executeTakeFirst();
    if (!orderItem) {
      throw new NotFoundException('OrderItem not found');
    }
    return orderItem;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const variantPrice = await this.db
      .selectFrom('product_variants')
      .innerJoin(
        'products',
        'product_variants.product_id',
        'products.product_id',
      )
      .select('product_variants.price')
      .where(
        'product_variants.variant_id',
        '=',
        Number(updateOrderItemDto.variant_id),
      )
      .where('products.is_active', '=', true)
      .executeTakeFirstOrThrow();

    if (!variantPrice) {
      throw new NotFoundException('Variant not found');
    }

    const updatedOrderItem = await this.db
      .updateTable('order_items')
      .set({
        ...updateOrderItemDto,
        sold_at_price: Number(variantPrice.price),
        updated_at: new Date(),
      })
      .where('order_item_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!updatedOrderItem) {
      throw new NotFoundException('OrderItem not found');
    }
    return updatedOrderItem;
  }

  async remove(id: number) {
    const deletedOrderItem = await this.db
      .deleteFrom('order_items')
      .where('order_item_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!deletedOrderItem) {
      throw new NotFoundException('OrderItem not found');
    }
    return { message: 'OrderItem deleted' };
  }
}
