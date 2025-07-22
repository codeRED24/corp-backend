import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class ProductVariantsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createProductVariantDto: CreateProductVariantDto) {
    return await this.db
      .insertInto('product_variants')
      .values(createProductVariantDto)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db.selectFrom('product_variants').selectAll().execute();
  }

  async findOne(id: number) {
    const productVariant = await this.db
      .selectFrom('product_variants')
      .where('variant_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!productVariant) {
      throw new NotFoundException(`Product variant not found`);
    }
    return productVariant;
  }

  async update(id: number, updateProductVariantDto: UpdateProductVariantDto) {
    const productVariant = await this.db
      .updateTable('product_variants')
      .set({ ...updateProductVariantDto, updated_at: new Date() })
      .where('variant_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!productVariant) {
      throw new NotFoundException(`Product variant not found`);
    }
    return productVariant;
  }

  async remove(id: number) {
    const productVariant = await this.db
      .deleteFrom('product_variants')
      .where('variant_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!productVariant) {
      throw new NotFoundException(`Product variant not found`);
    }
    return { message: `Product variant deleted` };
  }
}
