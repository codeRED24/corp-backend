import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Category Id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    description: 'Product Name',
    example: 'T-Shirt',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Product Description',
    example: 'This is a t-shirt',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product Base Price',
    example: 10.0,
  })
  @IsNumber()
  @IsNotEmpty()
  base_price: number;

  @ApiProperty({
    description: 'Is Product Active',
    example: true,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    description: 'Vendor Id',
    example: 1,
  })
  @IsNumber()
  vendor_id: number;

  @ApiProperty({
    description: 'Product Type',
    example: 'clothing',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
