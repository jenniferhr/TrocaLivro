import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';
import { BookConditionEnum } from 'src/books/domain/enums/book-condition.enum';

export class FindUserBooksByCriteriaDto {
  @ApiPropertyOptional({
    description: 'ID of the user who owns the book(s)',
  })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional({
    description: 'ID of the book(s) that belong to a user',
  })
  @IsOptional()
  @IsString()
  bookId?: string;

  @ApiPropertyOptional({
    description: 'Title of the book.',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Author of the book.',
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({
    description: 'Condition of the book',
    enum: BookConditionEnum,
  })
  @IsOptional()
  @IsEnum(BookConditionEnum)
  condition?: BookConditionEnum;

  @ApiPropertyOptional({
    description: 'Availability of the book',
    enum: BookAvailabilityEnum,
  })
  @IsOptional()
  @IsEnum(BookAvailabilityEnum)
  available?: BookAvailabilityEnum;
}
