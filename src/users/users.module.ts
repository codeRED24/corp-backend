import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AddressModule } from './address/address.module';

@Module({
  imports: [AddressModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
