import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AddressModule } from './address/address.module';
import { UserInterestsModule } from './user-interests/user-interests.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { CartModule } from './cart/cart.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    AddressModule,
    UserInterestsModule,
    WishlistModule,
    CartModule,
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
