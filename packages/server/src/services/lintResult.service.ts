import { Injectable } from '@nestjs/common';
import { TextLintEngine } from 'textlint';
import { TextlintMessage } from '@textlint/types';

@Injectable()
export class LintResultService {
  async execute(text: string, ruleNames: string[]) {
    const options = {
      rules: ruleNames,
      rulesConfig: ruleNames.reduce(
        (obj, name) => ({ ...obj, [name]: true }),
        {},
      ),
    };
    const engine = new TextLintEngine(options);

    const results = await engine.executeOnText(text);
    const messages = results[0].messages;

    return messages;
  }

  createPrismaDict(lintMessages: TextlintMessage[]) {
    const dict = {
      create: lintMessages.reduce(
        (obj, message) =>
          obj.concat([
            {
              message: message.message,
              ruleName: message.ruleId,
              line: message.line,
              column: message.column,
            },
          ]),
        [],
      ),
    };
    return dict;
  }
}
