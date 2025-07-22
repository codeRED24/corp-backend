import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductInterestDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ description: 'Interest ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  interest_id: number;
}
