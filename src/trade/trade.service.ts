import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async bulkImport(trades: CreateTradeDto[], userId: string) {
    const saved = [];

    for (const t of trades) {
      const upserted = await this.prisma.trade.upsert({
        where: { ticketId: t.ticketId },
        update: {
          // only update exitPrice, result, exitTime, tags & notes
          exitPrice: t.exitPrice,
          result: t.result,
          exitTime: t.exitTime, // null or an ISO string
          tags: t.tags,
          notes: t.notes,
        },
        create: {
          ...t,
          user: { connect: { id: userId } },
        },
      });
      saved.push(upserted);
    }

    return { result: saved.length, imported: saved };
  }
}
