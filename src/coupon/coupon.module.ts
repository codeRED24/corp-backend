import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CouponUsageModule } from './coupon-usage/coupon-usage.module';

@Module({
  imports: [DatabaseModule, CouponUsageModule],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
