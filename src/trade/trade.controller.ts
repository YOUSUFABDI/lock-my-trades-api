import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/interface/authReq.interface';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @UseGuards(JwtAuthGuard)
  @Post('import/mt')
  importMtTrades(
    @Req() req: AuthenticatedRequest,
    @Body() trades: CreateTradeDto[],
  ) {
    return this.tradeService.bulkImport(trades, req.user.id);
  }
}
