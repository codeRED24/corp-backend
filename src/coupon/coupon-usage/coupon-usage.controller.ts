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
import { CreateCouponUsageDto } from './dto/create-coupon-usage.dto';
import { UpdateCouponUsageDto } from './dto/update-coupon-usage.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouponUsageService } from './coupon-usage.service';

@ApiTags('coupon')
@Controller('coupon-usage')
export class CouponUsageController {
  constructor(private readonly couponService: CouponUsageService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new coupon usage' })
  @ApiResponse({
    status: 201,
    description: 'The coupon usage has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createUsage(@Body() createCouponUsageDto: CreateCouponUsageDto) {
    return this.couponService.create(createCouponUsageDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all coupon usages' })
  @ApiResponse({ status: 200, description: 'Return all coupon usages.' })
  findAllUsage() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a coupon usage by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Return the coupon usage.' })
  @ApiResponse({ status: 404, description: 'Coupon usage not found.' })
  findOneUsage(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a coupon usage' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The coupon usage has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Coupon usage not found.' })
  updateUsage(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCouponUsageDto: UpdateCouponUsageDto,
  ) {
    return this.couponService.update(id, updateCouponUsageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a coupon usage' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The coupon usage has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Coupon usage not found.' })
  removeUsage(@Param('id', ParseIntPipe) id: number) {
    return this.couponService.remove(id);
  }
}
