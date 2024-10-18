import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FindBookByTitleAndAuthorDto {
  @ApiProperty({
    description: 'The title of the book.',
    example: 'The Book of Philosophy',
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: 'The author of the book.',
    example: 'Maria Smith',
    type: String,
    minLength: 1,
    maxLength: 255,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  author: string;
}
