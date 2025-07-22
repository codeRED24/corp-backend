import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddRemoveFromWishlistDTO } from './dto/add-remove-from-wishlist.dto';

@ApiTags('user')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product variant to wishlist' })
  @ApiResponse({
    status: 201,
    description: 'The product variant has been added to wishlist',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() addToWishListDTO: AddRemoveFromWishlistDTO) {
    return this.wishlistService.create(addToWishListDTO);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all wishlisted products for the user' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the wishlist.' })
  @ApiResponse({ status: 404, description: 'Wishlist not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product variant from wishlist' })
  @ApiBody({ type: AddRemoveFromWishlistDTO })
  @ApiResponse({
    status: 200,
    description: 'The product variant has been removed from wishlist',
  })
  @ApiResponse({ status: 404, description: 'Wishlist not found.' })
  remove(@Body() removeFromWishlistDTO: AddRemoveFromWishlistDTO) {
    return this.wishlistService.remove(removeFromWishlistDTO);
  }
}
