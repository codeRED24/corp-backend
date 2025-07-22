import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart-item.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddToCartDTO } from './dto/add-to-cart.dto';

@ApiTags('user')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Add a product to cart' })
  @ApiBody({ type: AddToCartDTO })
  @ApiResponse({
    status: 201,
    description: 'The product has been added to cart',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() addToCart: AddToCartDTO) {
    return this.cartService.create(addToCart);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all items from cart' })
  @ApiResponse({ status: 200, description: 'Cart items' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCartDto })
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been updated',
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been deleted',
  })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.remove(id);
  }
}
