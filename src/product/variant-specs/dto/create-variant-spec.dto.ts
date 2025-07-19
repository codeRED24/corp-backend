import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVariantSpecDto {
  @ApiProperty({ example: '100', description: 'Variant ID' })
  @IsNumber()
  @IsNotEmpty()
  variant_id: number;

  @ApiProperty({ description: 'attribute name' })
  @IsNotEmpty()
  @IsString()
  attribute_name: string;

  @ApiProperty({ description: 'attribute value' })
  @IsNotEmpty()
  @IsString()
  attribute_value: string;

  @ApiProperty({ description: 'description', required: false })
  @IsString()
  description: string;
}
