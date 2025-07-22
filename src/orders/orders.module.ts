import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [DatabaseModule, OrderItemsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
