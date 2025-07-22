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
import { InterestTypeService } from './interest-type.service';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('interest-type')
@Controller('interest-type')
export class InterestTypeController {
  constructor(private readonly interestTypeService: InterestTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new interest type' })
  @ApiResponse({
    status: 201,
    description: 'The interest type has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createInterestTypeDto: CreateInterestTypeDto) {
    return this.interestTypeService.create(createInterestTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interest types' })
  @ApiResponse({ status: 200, description: 'Return all interest types.' })
  findAll() {
    return this.interestTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a interest type by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the interest type.' })
  @ApiResponse({ status: 404, description: 'Interest type not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interestTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a interest type' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The interest type has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Interest type not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInterestTypeDto: UpdateInterestTypeDto,
  ) {
    return this.interestTypeService.update(id, updateInterestTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a interest type' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The interest type has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Interest type not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interestTypeService.remove(id);
  }
}
