import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendorModule } from './vendor/vendor.module';
import { ConfigModule } from '@nestjs/config';
import { InterestTypeModule } from './interest-type/interest-type.module';
import { CouponModule } from './coupon/coupon.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductSpecsModule } from './product-specs/product-specs.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { VariantSpecsModule } from './variant-specs/variant-specs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VendorModule,
    InterestTypeModule,
    CouponModule,
    ProductModule,
    CategoryModule,
    ProductSpecsModule,
    ProductVariantsModule,
    VariantSpecsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
