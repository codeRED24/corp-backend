import { PartialType } from '@nestjs/swagger';
import { CreateCouponUsageDto } from './create-coupon-usage.dto';

export class UpdateCouponUsageDto extends PartialType(CreateCouponUsageDto) {}
