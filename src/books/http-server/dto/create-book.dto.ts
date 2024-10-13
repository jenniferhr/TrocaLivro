import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BookConditionEnum } from 'src/books/domain/enums/book-condition.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  author: string;

  @IsNotEmpty()
  @IsEnum(BookConditionEnum)
  condition: BookConditionEnum;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  comment?: string;
}
