import { Test } from '@nestjs/testing';
import { LintRuleService } from '@/services/lintRule.service';

describe('LintRuleService', () => {
  let lintRuleService: LintRuleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LintRuleService],
    }).compile();
    lintRuleService = moduleRef.get<LintRuleService>(LintRuleService);
  });

  describe('create', () => {
    it('should return formated dict for prisma', async () => {
      const testRuleName = 'testRuleName1';
      const testRuleNames = [testRuleName];
      const expected = {
        create: [{ ruleName: testRuleName }],
      };

      const rules = await lintRuleService.create(testRuleNames);
      expect(rules).toMatchObject(expected);
    });
  });
});
