import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookConditionEnum } from './../../../books/domain/enums/book-condition.enum';

export class CreateUserBookDto {
  @ApiProperty({
    description: "ID of the book being added to the user's collection",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @ApiProperty({
    description: 'Condition of the book',
    enum: BookConditionEnum,
    example: BookConditionEnum.NEW,
  })
  @IsNotEmpty()
  @IsEnum(BookConditionEnum)
  condition: BookConditionEnum;

  @ApiPropertyOptional({
    description: 'Optional comment about the book condition or other details',
    example: 'The book is in great condition, only slightly worn on the edges.',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
