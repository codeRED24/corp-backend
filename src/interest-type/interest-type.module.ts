import { Module } from '@nestjs/common';
import { InterestTypeService } from './interest-type.service';
import { InterestTypeController } from './interest-type.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InterestTypeController],
  providers: [InterestTypeService],
})
export class InterestTypeModule {}
