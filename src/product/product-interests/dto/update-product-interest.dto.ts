import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInterestDto } from 'src/users/user-interests/dto/create-user-interest.dto';

export class UpdateProductInterestDto extends PartialType(
  CreateUserInterestDto,
) {}
