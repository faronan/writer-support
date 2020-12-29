import { Module } from '@nestjs/common';
import { ProofreadingDataService } from '@/services/proofreadingData.service';
import { ProofreadingDataResolver } from '@/resolvers/proofreadingData.resolver';
import { PrismaService } from '@/services/prisma.service';
import { LintRuleService } from '@/services/lintRule.service';
import { LintResultService } from '@/services/lintResult.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    LintResultService,
    LintRuleService,
    PrismaService,
    ProofreadingDataService,
    ProofreadingDataResolver,
  ],
})
export class ProofreadingDataModule {}
