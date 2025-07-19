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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VendorModule,
    InterestTypeModule,
    CouponModule,
    ProductModule,
    CategoryModule,

    OrdersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
