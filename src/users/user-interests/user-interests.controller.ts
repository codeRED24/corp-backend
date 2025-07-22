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
import { UserInterestsService } from './user-interests.service';
import { CreateUserInterestDto } from './dto/create-user-interest.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user-interests')
export class UserInterestsController {
  constructor(private readonly userInterestsService: UserInterestsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user interest' })
  @ApiResponse({
    status: 201,
    description: 'The user interest has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserInterestDto: CreateUserInterestDto) {
    return this.userInterestsService.create(createUserInterestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user interests' })
  @ApiResponse({ status: 200, description: 'Return all user interests.' })
  findAll() {
    return this.userInterestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user interest by ID' })
  @ApiResponse({ status: 200, description: 'Return the user interest.' })
  @ApiResponse({ status: 404, description: 'User interest not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userInterestsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user interest' })
  @ApiResponse({
    status: 200,
    description: 'The user interest has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User interest not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userInterestsService.remove(id);
  }
}
