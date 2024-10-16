import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateExchangeDto {
  @ApiProperty({
    description: 'The id of the user book being offered.',
    type: String,
    required: true,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  offeredUserBookId: string;

  @ApiProperty({
    description: 'The id of the user book being requested.',
    type: String,
    required: true,
    example: 'c3bf3e82-9a0b-47d4-9e23-dcede122889b',
  })
  @IsNotEmpty()
  @IsUUID()
  requestedUserBookId: string;
}
