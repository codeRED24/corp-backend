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
import { VariantSpecsService } from './variant-specs.service';
import { CreateVariantSpecDto } from './dto/create-variant-spec.dto';
import { UpdateVariantSpecDto } from './dto/update-variant-spec.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('variant-specs')
export class VariantSpecsController {
  constructor(private readonly variantSpecsService: VariantSpecsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new variant spec' })
  @ApiResponse({
    status: 201,
    description: 'The variant spec has been successfully created.',
  })
  create(@Body() createVariantSpecDto: CreateVariantSpecDto) {
    return this.variantSpecsService.create(createVariantSpecDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all variant specs' })
  @ApiResponse({ status: 200, description: 'Return all variant specs.' })
  findAll() {
    return this.variantSpecsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a variant spec by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the variant spec.' })
  @ApiResponse({ status: 404, description: 'Variant spec not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.variantSpecsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a variant spec' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The variant spec has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Variant spec not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVariantSpecDto: UpdateVariantSpecDto,
  ) {
    return this.variantSpecsService.update(id, updateVariantSpecDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a variant spec' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The variant spec has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Variant spec not found.' })
  remove(@Param('id') id: string) {
    return this.variantSpecsService.remove(+id);
  }
}
