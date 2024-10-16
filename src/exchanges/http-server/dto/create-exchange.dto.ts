import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateExchangeDto {
  @IsNotEmpty()
  @IsUUID()
  offeredUserBookId: string;

  @IsNotEmpty()
  @IsUUID()
  requestedUserBookId: string;
}
