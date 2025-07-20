import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('import/mt')
  importMtTrades(@Req() req, @Body() trades: CreateTradeDto[]) {
    return this.tradeService.bulkImport(trades, req.user.id);
  }
}
