import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DB } from 'src/database/generated-types';
import { AddRemoveFromWishlistDTO } from './dto/add-remove-from-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(@Inject('KYSELY_DB') private readonly db: Kysely<DB>) {}

  async create(addToWishListDTO: AddRemoveFromWishlistDTO) {
    return await this.db
      .insertInto('wishlists')
      .values(addToWishListDTO)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /*
  Shows all products in the wishlist-
  -get items from wishlist
  -populate product info for all items
  */
  async findOne(id: number) {
    // Get wishlist items for the user, join with product_variants and products for product info
    const wishlistItems = await this.db
      .selectFrom('wishlists')
      .innerJoin(
        'product_variants',
        'wishlists.variant_id',
        'product_variants.variant_id',
      )
      .innerJoin(
        'products',
        'product_variants.product_id',
        'products.product_id',
      )
      .selectAll()
      .where('wishlists.user_id', '=', id)
      .execute();
    return wishlistItems;
  }

  async remove(removeFromWishlistDTO: AddRemoveFromWishlistDTO) {
    const result = await this.db
      .deleteFrom('wishlists')
      .where('user_id', '=', removeFromWishlistDTO.user_id)
      .where('variant_id', '=', removeFromWishlistDTO.variant_id)
      .execute();
    if (!result) {
      throw new NotFoundException(`Wishlist item not found`);
    }
    return { message: `Wishlist item removed` };
  }
}
