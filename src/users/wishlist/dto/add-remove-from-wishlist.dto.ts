import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddRemoveFromWishlistDTO {
  @ApiProperty({ description: 'User ID', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Product Variant ID', example: '1' })
  @IsNumber()
  @IsNotEmpty()
  variant_id: number;
}
