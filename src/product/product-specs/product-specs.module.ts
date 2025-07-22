import { Module } from '@nestjs/common';
import { ProductSpecsService } from './product-specs.service';
import { ProductSpecsController } from './product-specs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductSpecsController],
  providers: [ProductSpecsService],
})
export class ProductSpecsModule {}
