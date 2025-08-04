import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTradeDto } from './dto/create-trade.dto';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  // async bulkImport(trades: CreateTradeDto[], userId: string) {
  //   const saved = [];
  //   for (const t of trades) {
  //     const exists = await this.prisma.trade.findUnique({
  //       where: { ticketId: t.ticketId },
  //     });
  //     if (!exists) {
  //       const created = await this.prisma.trade.create({
  //         data: {
  //           ...t,
  //           user: {
  //             connect: {
  //               id: userId,
  //             },
  //           },
  //         },
  //       });
  //       saved.push(created);
  //     }
  //   }
  //   return { result: saved.length, imported: saved };
  // }

  async bulkImport(trades: CreateTradeDto[], userId: string) {
    const results = [];

    for (const t of trades) {
      // upsert: if ticketId exists, update; otherwise create
      const saved = await this.prisma.trade.upsert({
        where: { ticketId: t.ticketId },
        update: {
          // only update open‐trade fields; closed trades will never change
          exitPrice: t.exitPrice,
          result: t.result,
          exitTime: t.exitTime, // null for open trades, or actual time for closed
          tags: t.tags,
          notes: t.notes,
        },
        create: {
          ...t,
          user: { connect: { id: userId } },
        },
      });

      results.push(saved);
    }

    return {
      result: results.length,
      imported: results,
    };
  }
}
