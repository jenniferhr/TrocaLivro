import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FindBookByTitleAndAuthorDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  author: string;
}
