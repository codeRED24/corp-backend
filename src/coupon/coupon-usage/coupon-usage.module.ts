import { Module } from '@nestjs/common';
import { CouponUsageService } from './coupon-usage.service';
import { DatabaseModule } from 'src/database/database.module';
import { CouponUsageController } from './coupon-usage.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CouponUsageController],
  providers: [CouponUsageService],
})
export class CouponUsageModule {}
