import { Module } from '@nestjs/common';
import { VariantSpecsService } from './variant-specs.service';
import { VariantSpecsController } from './variant-specs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VariantSpecsController],
  providers: [VariantSpecsService],
})
export class VariantSpecsModule {}
