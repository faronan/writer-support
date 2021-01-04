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

  describe('create', () => {
    it('should return lint result', async () => {
      const testWrongText = '私はご飯を食べれます。';
      const testLintRules = ['no-dropping-the-ra'];
      const expected = {
        create: [
          { message: 'ら抜き言葉を使用しています。', column: 8, line: 1 },
        ],
      };

      const result = await lintResultService.create(
        testWrongText,
        testLintRules,
      );
      expect(result).toMatchObject(expected);
    });
  });
});
