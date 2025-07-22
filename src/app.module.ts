import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { ConfigModule } from '@nestjs/config';
import { InterestTypeModule } from './interest-type/interest-type.module';
import { CouponModule } from './coupon/coupon.module';
import { CategoryModule } from './product/category/category.module';
import { ProductModule } from './product/product.module';

import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    VendorModule,
    InterestTypeModule,
    CouponModule,
    ProductModule,
    CategoryModule,
    OrdersModule,
    UsersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
