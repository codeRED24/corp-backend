import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, MaxLength } from 'class-validator';

export class CreateVendorDto {
  @ApiProperty({ example: 'Vendor Inc.' })
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @ApiProperty({ example: '27ABCDE1234F1Z5', required: false })
  @IsString()
  @IsNotEmpty()
  vendor_gst_number: string;

  @ApiProperty({ example: '123 Main St, Anytown, USA', required: false })
  @IsString()
  @IsNotEmpty()
  vendor_address: string;

  @ApiProperty({ example: '12.9716', required: false })
  @IsDecimal()
  @IsNotEmpty()
  vendor_latitude: string;

  @ApiProperty({ example: '77.5946', required: false })
  @IsDecimal()
  @IsNotEmpty()
  vendor_longitude: string;

  @ApiProperty({ example: '123456', required: false })
  @IsString()
  @MaxLength(6)
  @IsNotEmpty()
  pin_code: string;

  @ApiProperty({ example: 'Electronics' })
  @IsString()
  type: string;
}
