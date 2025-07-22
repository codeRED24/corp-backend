import { Module } from '@nestjs/common';
import { UserInterestsController } from './product-interests.controller';
import { ProductInterestsService } from './product-interests.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserInterestsController],
  providers: [ProductInterestsService],
})
export class ProductInterestsModule {}
