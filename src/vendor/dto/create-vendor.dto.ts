import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({ example: 'Vendor Inc.' })
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @ApiProperty({ example: '27ABCDE1234F1Z5' })
  @IsString()
  @IsNotEmpty()
  vendor_gst_number: string;

  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  @IsString()
  @IsNotEmpty()
  vendor_address: string;

  @ApiProperty({ example: '12.9716' })
  @IsDecimal()
  @IsNotEmpty()
  vendor_latitude: string;

  @ApiProperty({ example: '77.5946' })
  @IsDecimal()
  @IsNotEmpty()
  vendor_longitude: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MaxLength(6)
  @IsNotEmpty()
  pin_code: string;

  @ApiProperty({ example: 'Electronics', required: false })
  @IsString()
  type: string;
}
