import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Order ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'Payment Method', example: 'card' })
  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @ApiProperty({ description: 'Payment Status', example: 'pending' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Transaction ID', example: '123456789' })
  @IsNotEmpty()
  @IsString()
  transaction_id: string;
}
