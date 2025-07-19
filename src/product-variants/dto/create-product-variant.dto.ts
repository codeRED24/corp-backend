import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductVariantDto {
  @ApiProperty({ example: '100', description: 'Product ID' })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'dimensions', required: false })
  @IsOptional()
  dimensions: string;

  @ApiProperty({ description: 'color', required: false })
  @IsOptional()
  color: string;

  @ApiProperty({ description: 'color code', required: false })
  @IsOptional()
  color_code: string;

  @ApiProperty({ description: 'weight in grams', required: false })
  @IsOptional()
  weight_in_gm: number;

  @ApiProperty({ example: '123456', description: 'SKU' })
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'in stock', required: false })
  @IsOptional()
  in_stock: number;

  @ApiProperty({ example: '100', description: 'price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'discount amount', required: false })
  @IsOptional()
  discount_amount: number;

  @ApiProperty({ description: 'discount percentage', required: false })
  @IsOptional()
  discount_percentage: number;
}
