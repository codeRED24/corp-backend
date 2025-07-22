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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductInterestDto } from './dto/create-product-interest.dto';
import { ProductInterestsService } from './product-interests.service';

@ApiTags('product')
@Controller('product-interests')
export class UserInterestsController {
  constructor(private readonly userInterestsService: ProductInterestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product interest' })
  @ApiResponse({
    status: 201,
    description: 'The product interest has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserInterestDto: CreateProductInterestDto) {
    return this.userInterestsService.create(createUserInterestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all product interests' })
  @ApiResponse({ status: 200, description: 'Return all product interests.' })
  findAll() {
    return this.userInterestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product interest by ID' })
  @ApiResponse({ status: 200, description: 'Return the product interest.' })
  @ApiResponse({ status: 404, description: 'Product interest not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userInterestsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product interest' })
  @ApiResponse({
    status: 200,
    description: 'The product interest has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Product interest not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userInterestsService.remove(id);
  }
}
