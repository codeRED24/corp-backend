import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { DB } from 'src/database/generated-types';
import { Kysely } from 'kysely';

@Injectable()
export class PaymentsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.db.transaction().execute(async (trx) => {
      // First, get the order details
      const order = await trx
        .selectFrom('orders')
        .selectAll()
        .where('order_id', '=', createPaymentDto.order_id)
        .executeTakeFirstOrThrow();

      if (!order) {
        throw new Error('Order not found');
      }

      // Create the payment
      const newPayment = await trx
        .insertInto('payments')
        .values({ ...createPaymentDto, amount: order.total_price })
        .returningAll()
        .executeTakeFirstOrThrow();

      // Update the order status to "paid"
      await trx
        .updateTable('orders')
        .set({ status: 'paid', updated_at: new Date() })
        .where('order_id', '=', createPaymentDto.order_id)
        .execute();

      return newPayment;
    });
  }

  async findAll() {
    return await this.db.selectFrom('payments').selectAll().execute();
  }

  async findOne(id: number) {
    const payment = await this.db
      .selectFrom('payments')
      .selectAll()
      .where('payment_id', '=', id)
      .executeTakeFirst();
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  }

  // async update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   const updatedPayment = await this.db
  //     .updateTable('payments')
  //     .set(updatePaymentDto)
  //     .where('payment_id', '=', id)
  //     .returningAll()
  //     .executeTakeFirstOrThrow();
  //   if (!updatedPayment) {
  //     throw new Error('Payment not found');
  //   }
  //   return updatedPayment;
  // }

  async remove(id: number) {
    const deletedPayment = await this.db
      .deleteFrom('payments')
      .where('payment_id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    if (!deletedPayment) {
      throw new Error('Payment not found');
    }
    return { message: 'Payment deleted' };
  }
}
