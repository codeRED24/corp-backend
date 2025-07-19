import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class ProductSpecsService {
  constructor(@Inject('KYSELY_DB') private readonly db:Kysely<DB>) {}
  
  async create(createProductSpecDto: CreateProductSpecDto) {
    return await this.db.insertInto('product_specifications').values(createProductSpecDto).returningAll().executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db.selectFrom('product_specifications').selectAll().execute();
  }

  async findOne(id: number) {
    const productSpec = await this.db.selectFrom('product_specifications').where('spec_id', '=', id).selectAll().executeTakeFirst();
    if(!productSpec) {
      throw new NotFoundException('Product Spec not found');
    }
    return productSpec;
  }

  async update(id: number, updateProductSpecDto: UpdateProductSpecDto) {
    const productSpec = await this.db.updateTable('product_specifications').set(updateProductSpecDto).where('spec_id', '=', id).returningAll().executeTakeFirst();
    if(!productSpec) {
      throw new NotFoundException("Product Spec not found");
    }
    return productSpec;
  }

  async remove(id: number) {
    const productSpec = await this.db.deleteFrom('product_specifications').where('spec_id', '=', id).returningAll().executeTakeFirst();
    if(!productSpec) {
      throw new NotFoundException("Product Spec not found");
    }
    return {message: `Category deleted`}
  }
}
