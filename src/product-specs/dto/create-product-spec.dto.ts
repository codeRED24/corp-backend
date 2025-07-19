import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductSpecDto {
    @ApiProperty({ example: '1' })
    @IsNumber()
    @IsNotEmpty()
    product_id: number;

    @ApiProperty({ example: "size" })
    @IsNotEmpty()
    @IsString()
    attribute_name: string;

    @ApiProperty({ example: "M" })
    @IsNotEmpty()
    @IsString()
    attribute_value: string;

    @ApiProperty({ example:"This is for 5'10''" })
    @IsString()
    description: string;
}
