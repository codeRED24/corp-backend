import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { AddToCartDTO } from './add-to-cart.dto';

export class UpdateCartDto extends PartialType(
  OmitType(AddToCartDTO, ['user_id', 'product_id'] as const),
) {}
