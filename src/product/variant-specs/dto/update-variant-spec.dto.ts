import { PartialType } from '@nestjs/swagger';
import { CreateVariantSpecDto } from './create-variant-spec.dto';

export class UpdateVariantSpecDto extends PartialType(CreateVariantSpecDto) {}
