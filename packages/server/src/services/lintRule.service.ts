import { LintRule } from '@/models/lintRule.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LintRuleService {
  async formatForPrisma(rules: LintRule[]) {
    const dict = {
      connectOrCreate: [
        {
          where: { ruleId: 'hoge' },
          create: { ruleId: 'hoge' },
        },
        {
          where: { ruleId: 'huga' },
          create: { ruleId: 'huga' },
        },
      ],
    };
    return await dict;
  }
}
