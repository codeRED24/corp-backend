import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Variant ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  variant_id: number;

  @ApiProperty({ description: 'Quantity', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
