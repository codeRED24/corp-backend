import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateInterestTypeDto {
  @ApiProperty({ example: 'Interest Name', required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  interest_name: string;

  @ApiProperty({ example: 'Interest Description', required: false })
  @IsString()
  description: string;
}
