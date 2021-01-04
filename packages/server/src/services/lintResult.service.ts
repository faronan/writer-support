import { Injectable } from '@nestjs/common';
import { TextLintEngine } from 'textlint';

@Injectable()
export class LintResultService {
  async create(text: string, ruleNames: string[]) {
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
    const dict = {
      create: messages.reduce(
        (obj, message) =>
          obj.concat([
            {
              message: message.message,
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
