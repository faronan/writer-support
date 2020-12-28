import { Module } from '@nestjs/common';
import { ProofreadingDataService } from '@/services/proofreadingData.service';
import { ProofreadingDataResolver } from '@/resolvers/proofreadingData.resolver';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService, ProofreadingDataService, ProofreadingDataResolver],
})
export class ProofreadingDataModule {}
