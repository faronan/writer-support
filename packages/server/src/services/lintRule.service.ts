import { Injectable } from '@nestjs/common';

@Injectable()
export class LintRuleService {
  async create(ruleNames: string[]) {
    const dict = {
      create: ruleNames.reduce(
        (obj, name) => obj.concat([{ ruleName: name }]),
        [],
      ),
    };
    return await dict;
  }
}
