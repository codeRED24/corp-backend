import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class CategoryService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.db
      .insertInto('categories')
      .values(createCategoryDto)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db.selectFrom('categories').selectAll().execute();
  }

  async findOne(id: number) {
    const category = await this.db
      .selectFrom('categories')
      .where('category_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.db
      .updateTable('categories')
      .set({ ...updateCategoryDto, updated_at: new Date() })
      .where('category_id', '=', id)
      .returningAll()
      .executeTakeFirst();
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }

  async remove(id: number) {
    const category = await this.db
      .deleteFrom('categories')
      .where('category_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return { message: `Category deleted` };
  }
}
