
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({ example: '100', description: 'User ID' })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ description: 'House number' })
  @IsNotEmpty()
  house_number: string;

  @ApiProperty({ description: 'Street name' })
  @IsNotEmpty()
  street_name: string;

  @ApiProperty({ description: 'City' })
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'State' })
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Zip code' })
  @IsNotEmpty()
  zip_code: string;

  @ApiProperty({ description: 'Country' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'Latitude' })
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Longitude' })
  @IsNotEmpty()
  longitude: number;
}
