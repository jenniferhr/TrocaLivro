import { IsOptional, IsEnum, IsString, ValidateIf } from 'class-validator';
import { BookAvailabilityEnum } from 'src/books/domain/enums/book-availability.enum';
import { BookConditionEnum } from 'src/books/domain/enums/book-condition.enum';

export class UpdateUserBookDto {
  @IsOptional()
  @IsEnum(BookConditionEnum)
  condition?: BookConditionEnum;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsEnum(BookAvailabilityEnum)
  available?: BookAvailabilityEnum;

  // Custom validation to ensure at least one field is present
  @ValidateIf((o) => !o.condition && !o.comment && !o.available)
  validateAtLeastOneField() {
    throw new Error('At least one field must be updated.');
  }
}
