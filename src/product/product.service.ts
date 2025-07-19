import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class ProductService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createProductDto: CreateProductDto) {
    return await this.db
      .insertInto('products')
      .values(createProductDto)
      .returningAll()
      .executeTakeFirst();
  }

  async findAll() {
    return await this.db.selectFrom('products').selectAll().execute();
  }

  async findOne(id: number) {
    const product = await this.db
      .selectFrom('products')
      .selectAll()
      .where('product_id', '=', id)
      .executeTakeFirst();

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.db
      .updateTable('products')
      .set({ ...updateProductDto, updated_at: new Date() })
      .where('product_id', '=', id)
      .returningAll()
      .executeTakeFirst();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async remove(id: number) {
    const product = await this.db
      .deleteFrom('products')
      .where('product_id', '=', id)
      .returningAll()
      .executeTakeFirst();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
