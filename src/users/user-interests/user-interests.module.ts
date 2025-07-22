import { Module } from '@nestjs/common';
import { UserInterestsService } from './user-interests.service';
import { UserInterestsController } from './user-interests.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserInterestsController],
  providers: [UserInterestsService],
})
export class UserInterestsModule {}
