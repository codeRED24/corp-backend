import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ description: 'Order status', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}
