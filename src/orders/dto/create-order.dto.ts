import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '100', description: 'User ID' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Saved address ID' })
  @IsNumber()
  @IsNotEmpty()
  saved_address_id: number;
}
