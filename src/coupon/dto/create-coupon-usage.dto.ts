import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCouponUsageDto {
  @ApiProperty({ example: '100', description: 'Coupon ID' })
  @IsNumber()
  @IsNotEmpty()
  coupon_id: number;

  @ApiProperty({ example: '100', description: 'User ID' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Order ID' })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;
}
