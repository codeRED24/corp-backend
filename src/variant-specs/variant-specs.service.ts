import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariantSpecDto } from './dto/create-variant-spec.dto';
import { UpdateVariantSpecDto } from './dto/update-variant-spec.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';

@Injectable()
export class VariantSpecsService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createVariantSpecDto: CreateVariantSpecDto) {
    return await this.db
      .insertInto('variant_specifications')
      .values(createVariantSpecDto)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db
      .selectFrom('variant_specifications')
      .selectAll()
      .execute();
  }

  async findOne(id: number) {
    const variantSpec = await this.db
      .selectFrom('variant_specifications')
      .where('variant_spec_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!variantSpec) {
      throw new NotFoundException(`Variant spec not found`);
    }
    return variantSpec;
  }

  async update(id: number, updateVariantSpecDto: UpdateVariantSpecDto) {
    const variantSpec = await this.db
      .updateTable('variant_specifications')
      .set(updateVariantSpecDto)
      .where('variant_spec_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!variantSpec) {
      throw new NotFoundException(`Variant spec not found`);
    }
    return variantSpec;
  }

  async remove(id: number) {
    const variantSpec = await this.db
      .deleteFrom('variant_specifications')
      .where('variant_spec_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!variantSpec) {
      throw new NotFoundException(`Variant spec not found`);
    }
    return { message: `Variant spec deleted` };
  }
}
