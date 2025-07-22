import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class OrdersService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.db.transaction().execute(async (trx) => {
      // Get cart items for the user
      const cartItems = await trx
        .selectFrom('carts')
        .innerJoin('products', 'carts.product_id', 'products.product_id')
        .innerJoin(
          'product_variants',
          'carts.variant_id',
          'product_variants.variant_id',
        )
        .select([
          'carts.cart_id',
          'carts.user_id',
          'carts.product_id',
          'carts.variant_id',
          'carts.quantity',
          'product_variants.price',
        ])
        .where('carts.user_id', '=', createOrderDto.user_id)
        .execute();

      if (!cartItems || cartItems.length === 0) {
        throw new NotFoundException('Cart is empty or not found');
      }

      console.log({ cartItems });

      // Calculate total price
      const totalPrice = cartItems.reduce(
        (acc, curr) => acc + curr.quantity * Number(curr.price),
        0,
      );

      // Create the order
      const newOrder = await trx
        .insertInto('orders')
        .values({
          ...createOrderDto,
          total_price: totalPrice.toString(),
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      // Create order items from cart items
      const orderItemsData = cartItems.map((item) => ({
        order_id: newOrder.order_id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        sold_at_price: item.price,
      }));

      await trx.insertInto('order_items').values(orderItemsData).execute();

      // Clear the user's cart after successful order creation
      await trx
        .deleteFrom('carts')
        .where('user_id', '=', createOrderDto.user_id)
        .execute();

      return newOrder;
    });
  }

  async findAll(id: number) {
    return await this.db
      .selectFrom('orders')
      .innerJoin('order_items', 'orders.order_id', 'order_items.order_id')
      .innerJoin(
        'product_variants',
        'order_items.variant_id',
        'product_variants.variant_id',
      )
      .innerJoin(
        'products',
        'product_variants.product_id',
        'products.product_id',
      )
      .selectAll()
      .where('orders.user_id', '=', id)
      .execute();
  }

  async findOne(id: number) {
    const order = await this.db
      .selectFrom('orders')
      .innerJoin('order_items', 'orders.order_id', 'order_items.order_id')
      .innerJoin(
        'product_variants',
        'order_items.variant_id',
        'product_variants.variant_id',
      )
      .innerJoin(
        'products',
        'product_variants.product_id',
        'products.product_id',
      )
      .selectAll()
      .where('order_id', '=', id)
      .executeTakeFirst();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.db
      .updateTable('orders')
      .set({ ...updateOrderDto, updated_at: new Date() })
      .where('order_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }
    return updatedOrder;
  }

  async remove(id: number) {
    const deletedOrder = await this.db
      .deleteFrom('orders')
      .where('order_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!deletedOrder) {
    }
    return { message: 'Order deleted' };
  }
}
