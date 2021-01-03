import { Injectable } from '@nestjs/common';

@Injectable()
export class LintResultService {
  async create(text: string, ruleNames: string[]) {
    const dict = {
      create: [{ message: 'hoge', line: 1, column: 1 }],
    };
    return await dict;
  }
}
