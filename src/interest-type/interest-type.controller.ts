import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InterestTypeService } from './interest-type.service';
import { CreateInterestTypeDto } from './dto/create-interest-type.dto';
import { UpdateInterestTypeDto } from './dto/update-interest-type.dto';

@Controller('interest-type')
export class InterestTypeController {
  constructor(private readonly interestTypeService: InterestTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInterestTypeDto: CreateInterestTypeDto) {
    return this.interestTypeService.create(createInterestTypeDto);
  }

  @Get()
  findAll() {
    return this.interestTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInterestTypeDto: UpdateInterestTypeDto,
  ) {
    return this.interestTypeService.update(+id, updateInterestTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.interestTypeService.remove(+id);
  }
}
