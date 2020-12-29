import { LintResult } from '@/models/lintResult.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LintResultService {
  async executeLint(text: string) {
    const result: LintResult[] = [];
    return await result;
  }
  async formatForPrisma(result: LintResult[]) {
    const dict = {
      create: [{ message: 'hoge', line: 1, column: 1 }],
    };
    return await dict;
  }
}
