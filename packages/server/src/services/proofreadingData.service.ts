import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { LintRuleService } from '@/services/lintRule.service';
import { LintResultService } from '@/services/lintResult.service';
import { ProofreadingData } from '@/models/proofreadingData.model';
import { LintRule } from '@/models/lintRule.model';
import { LintResult } from '@/models/lintResult.model';

@Injectable()
export class ProofreadingDataService {
  constructor(
    private prismaService: PrismaService,
    private ruleService: LintRuleService,
    private resultService: LintResultService,
  ) {}

  async findMany() {
    return await this.prismaService.proofreadingData.findMany({
      include: {
        rules: true,
        result: true,
      },
    });
  }

  async create(text: string, ruleNames: string[]) {
    const rules = await this.ruleService.create(ruleNames);
    const result = await this.resultService.create(text, ruleNames);
    const prismaProofreadingData = await this.prismaService.proofreadingData.create(
      {
        data: { text: text, rules: rules, result: result },
      },
    );

    // MEMO: prismaService.proofreadingData.createの戻り値にはruleとresultが含まれていない
    // ruleとresultを入れたProofreadingDataを新たに作成してからクライアントに返す
    const transformProofreadingData = this.transform(
      prismaProofreadingData,
      ruleNames,
      result['create'],
    );

    return transformProofreadingData;
  }

  private transform = (
    prismaProofreadingData: { dataId: number; text: string },
    ruleNames: string[],
    result: LintResult[],
  ) => {
    const proofreadingData = new ProofreadingData();
    proofreadingData.dataId = prismaProofreadingData.dataId;
    proofreadingData.text = prismaProofreadingData.text;
    proofreadingData.rules = ruleNames.map((n) => {
      const rule = new LintRule();
      rule.ruleName = n;
      return rule;
    });
    proofreadingData.result = result.map((r) => {
      const result = new LintResult();
      result.message = r.message;
      result.line = r.line;
      result.column = r.column;
      return result;
    });
    return proofreadingData;
  };
}
