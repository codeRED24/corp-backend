import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class OrdersService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}
  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.db
      .insertInto('orders')
      .values(createOrderDto)
      .returningAll()
      .executeTakeFirstOrThrow();
    return newOrder;
  }

  async findAll() {
    return await this.db.selectFrom('orders').selectAll().execute();
  }

  async findOne(id: number) {
    return await this.db
      .selectFrom('orders')
      .selectAll()
      .where('order_id', '=', id)
      .executeTakeFirst();
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.db
      .updateTable('orders')
      .set({ ...updateOrderDto, updated_at: new Date() })
      .where('order_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    return updatedOrder;
  }

  async remove(id: number) {
    const deletedOrder = await this.db
      .deleteFrom('orders')
      .where('order_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    return deletedOrder;
  }
}
