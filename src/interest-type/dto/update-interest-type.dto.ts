import { PartialType } from '@nestjs/mapped-types';
import { CreateInterestTypeDto } from './create-interest-type.dto';

export class UpdateInterestTypeDto extends PartialType(CreateInterestTypeDto) {}
