import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ProductSpecsModule } from './product-specs/product-specs.module';
import { VariantSpecsModule } from './variant-specs/variant-specs.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductInterestsModule } from './product-interests/product-interests.module';

@Module({
  imports: [
    DatabaseModule,
    ProductSpecsModule,
    VariantSpecsModule,
    ProductVariantsModule,
    ProductInterestsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
