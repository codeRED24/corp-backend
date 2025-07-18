import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    description: 'The coupon code',
    example: 'SUMMER25',
  })
  @IsString()
  @IsNotEmpty()
  coupon_code: string;

  @ApiProperty({
    description: 'The description of coupon',
    example: "New Summer's Sale",
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Discount Type', example: 'percentage' })
  @IsString()
  @IsNotEmpty()
  discount_type: string;

  @ApiProperty({ description: 'Discount Value', example: 10.0 })
  @IsNumber()
  @IsNotEmpty()
  discount_value: number;

  @ApiProperty({ description: 'Min Order Value', example: 10.0 })
  @IsNumber()
  min_order_value: number;

  @ApiProperty({ description: 'Max Discount Value', example: 10.0 })
  @IsNumber()
  max_discount_value: number;

  @ApiProperty({
    description: 'Start Date',
    example: '2025-12-31T23:59:59.999Z',
  })
  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty({ description: 'End Date', example: '2025-12-31T23:59:59.999Z' })
  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty({ description: 'Usage Limit', example: 10 })
  @IsNumber()
  usage_limit: number;

  @ApiProperty({ description: 'Is Active', example: true })
  @IsBoolean()
  is_active: boolean;
}
