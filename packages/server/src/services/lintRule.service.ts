import { Injectable } from '@nestjs/common';

@Injectable()
export class LintRuleService {
  async create(ruleNames: string[]) {
    const dict = {
      connectOrCreate: ruleNames.reduce(
        (obj, name) =>
          obj.concat([
            { where: { ruleName: name }, create: { ruleName: name } },
          ]),
        [],
      ),
    };
    return await dict;
  }
}
