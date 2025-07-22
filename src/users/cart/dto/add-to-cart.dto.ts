import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddToCartDTO {
  @ApiProperty({ description: 'User ID', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Product ID', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Product Variant ID', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  variant_id: number;

  @ApiProperty({ description: 'Quantity', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
