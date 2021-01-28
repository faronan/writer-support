import { Test } from '@nestjs/testing';
import { LintResultService } from '@/services/lintResult.service';

describe('LintResultService', () => {
  let lintResultService: LintResultService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LintResultService],
    }).compile();
    lintResultService = moduleRef.get<LintResultService>(LintResultService);
  });

  describe('execute', () => {
    it('should return lint result', async () => {
      const testWrongText = '私はご飯を食べれます。';
      const testLintRules = ['no-dropping-the-ra'];
      const expected = [
        {
          column: 8,
          fix: undefined,
          index: 7,
          line: 1,
          message: 'ら抜き言葉を使用しています。',
          ruleId: testLintRules[0],
          severity: 2,
          type: 'lint',
        },
      ];

      const result = await lintResultService.execute(
        testWrongText,
        testLintRules,
      );
      expect(result).toMatchObject(expected);
    });
  });

  describe('createPrismaDict', () => {
    it('should return formatted dict for prisma', async () => {
      const messages = [
        {
          type: '',
          ruleId: '',
          message: '',
          column: 1,
          line: 1,
          index: 1,
          severity: 2,
        },
      ];
      const expected = {
        create: [{ message: '', column: 1, line: 1, ruleName: '' }],
      };

      const result = lintResultService.createPrismaDict(messages);
      expect(result).toMatchObject(expected);
    });
  });
});
