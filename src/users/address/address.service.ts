import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(createAddressDto: CreateAddressDto) {
    return await this.db
      .insertInto('saved_addresses')
      .values(createAddressDto)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findAll() {
    return await this.db.selectFrom('saved_addresses').selectAll().execute();
  }

  async findOne(id: number) {
    const address = await this.db
      .selectFrom('saved_addresses')
      .where('saved_address_id', '=', id)
      .selectAll()
      .executeTakeFirst();

    if (!address) {
      throw new NotFoundException(`Address not found`);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const address = await this.db
      .updateTable('saved_addresses')
      .set({ ...updateAddressDto, updated_at: new Date() })
      .where('saved_address_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!address) {
      throw new NotFoundException(`Address not found`);
    }
    return address;
  }

  async remove(id: number) {
    const address = await this.db
      .deleteFrom('saved_addresses')
      .where('saved_address_id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!address) {
      throw new NotFoundException(`Address not found`);
    }
    return { message: `Address deleted` };
  }
}
