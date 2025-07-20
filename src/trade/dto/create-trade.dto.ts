import {
  IsString,
  IsNumber,
  IsISO8601,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateTradeDto {
  @IsString() symbol: string;
  @IsString() direction: 'BUY' | 'SELL';
  @IsNumber() entryPrice: number;
  @IsNumber() exitPrice: number;
  @IsISO8601() entryTime: string;
  @IsISO8601() exitTime: string;
  @IsNumber() quantity: number;
  @IsNumber() result: number;
  @IsString() ticketId: string;
  @IsString() platform: 'mt5' | 'mt4' | 'ctrader';
  @IsArray() tags: string[];
  @IsOptional() @IsString() notes?: string;
}
