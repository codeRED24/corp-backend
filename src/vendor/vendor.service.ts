import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createVendorDto: CreateVendorDto) {
    return await this.db
      .insertInto('vendor')
      .values(createVendorDto)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db.selectFrom('vendor').selectAll().execute();
  }

  async findOne(id: number) {
    const vendor = await this.db
      .selectFrom('vendor')
      .where('vendor_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!vendor) {
      throw new NotFoundException(`Vendor not found`);
    }
    return vendor;
  }

  async update(id: number, updateVendorDto: UpdateVendorDto) {
    const vendor = await this.db
      .updateTable('vendor')
      .set(updateVendorDto)
      .where('vendor_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!vendor) {
      throw new NotFoundException(`Vendor not found`);
    }
    return vendor;
  }

  async remove(id: number) {
    const vendor = await this.db
      .deleteFrom('vendor')
      .where('vendor_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return { message: `Vendor deleted` };
  }
}
