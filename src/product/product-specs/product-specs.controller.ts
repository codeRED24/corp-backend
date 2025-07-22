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
import { ProductSpecsService } from './product-specs.service';
import { CreateProductSpecDto } from './dto/create-product-spec.dto';
import { UpdateProductSpecDto } from './dto/update-product-spec.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product-specs')
export class ProductSpecsController {
  constructor(private readonly productSpecsService: ProductSpecsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product specification' })
  @ApiResponse({
    status: 201,
    description: 'The product specification has been created successfully',
  })
  create(@Body() createProductSpecDto: CreateProductSpecDto) {
    return this.productSpecsService.create(createProductSpecDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product specifications' })
  @ApiResponse({ status: 200, description: 'retrun all product specs' })
  findAll() {
    return this.productSpecsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product specification by id' })
  @ApiParam({ name: 'id', description: 'The ID of the product specification' })
  @ApiResponse({ status: 200, description: 'retrun all product specs' })
  @ApiResponse({ status: 404, description: 'Product specification not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productSpecsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product specification by id' })
  @ApiParam({ name: 'id', description: 'The ID of the product specification' })
  @ApiResponse({
    status: 200,
    description: 'Product specification updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Product specification not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductSpecDto: UpdateProductSpecDto,
  ) {
    return this.productSpecsService.update(id, updateProductSpecDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product specification by id' })
  @ApiParam({ name: 'id', description: 'The ID of the product specification' })
  @ApiResponse({
    status: 200,
    description: 'Product specification deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Product specification not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productSpecsService.remove(id);
  }
}
