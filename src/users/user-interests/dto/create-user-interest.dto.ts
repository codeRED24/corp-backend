import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserInterestDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Interest ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  interest_id: number;
}
