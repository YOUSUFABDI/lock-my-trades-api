import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async bulkImport(trades: CreateTradeDto[], userId: string) {
    const saved = [];
    for (const t of trades) {
      const exists = await this.prisma.trade.findUnique({
        where: { ticketId: t.ticketId },
      });
      if (!exists) {
        const created = await this.prisma.trade.create({
          data: { ...t, userId },
        });
        saved.push(created);
      }
    }
    return { result: saved.length, imported: saved };
  }
}
