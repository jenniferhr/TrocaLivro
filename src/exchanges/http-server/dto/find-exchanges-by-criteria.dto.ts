import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ExchangeStatusEnum } from 'src/exchanges/domain/enums/exchange-status.enum';

export class FindExchangesByCriteriaDto {
  @ApiPropertyOptional({
    description: 'Status of the exhange',
    enum: ExchangeStatusEnum,
  })
  @IsOptional()
  @IsEnum(ExchangeStatusEnum)
  status?: ExchangeStatusEnum;
}
