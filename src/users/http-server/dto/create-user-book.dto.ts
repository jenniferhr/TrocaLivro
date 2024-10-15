import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BookConditionEnum } from 'src/books/domain/enums/book-condition.enum';

export class CreateUserBookDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsEnum(BookConditionEnum)
  condition: BookConditionEnum;

  @IsOptional()
  @IsString()
  comment?: string;
}
