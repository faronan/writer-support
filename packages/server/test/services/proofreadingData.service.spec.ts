import { Test } from '@nestjs/testing';
import { LintResultService } from '@/services/lintResult.service';
import { LintRuleService } from '@/services/lintRule.service';
import { PrismaService } from '@/services/prisma.service';
import { ProofreadingDataService } from '@/services/proofreadingData.service';

describe('ProofreadingDataService', () => {
  let proofreadingDataService: ProofreadingDataService;
  let prismaService: PrismaService;
  let lintRuleService: LintRuleService;
  let lintResultService: LintResultService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        LintRuleService,
        LintResultService,
        ProofreadingDataService,
        PrismaService,
      ],
    }).compile();

    proofreadingDataService = moduleRef.get<ProofreadingDataService>(
      ProofreadingDataService,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    lintRuleService = moduleRef.get<LintRuleService>(LintRuleService);
    lintResultService = moduleRef.get<LintResultService>(LintResultService);
  });

  describe('findMany', () => {
    it('should call prisma findMany', async () => {
      const prismaFindManyMock = jest.fn();
      prismaService.proofreadingData['findMany'] = prismaFindManyMock;

      await proofreadingDataService.findMany();
      expect(prismaFindManyMock).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call each services create', async () => {
      const testText = 'test';
      const testRules = ['testRule'];
      const testReturnRules = { create: [{ ruleName: testRules[0] }] };
      const testReturnResults = { create: ['testResults'] };
      const expectedArg = {
        data: {
          text: testText,
          rules: testReturnRules,
          result: testReturnResults,
        },
      };

      const lintRuleServiceCreateMock = jest.fn(() =>
        Promise.resolve(testReturnRules),
      );
      lintRuleService['create'] = lintRuleServiceCreateMock;
      const lintResultServiceCreateMock = jest.fn(() =>
        Promise.resolve(testReturnResults),
      );
      lintResultService['create'] = lintResultServiceCreateMock;
      const prismaCreateMock = jest.fn();
      prismaService.proofreadingData['create'] = prismaCreateMock;

      await proofreadingDataService.create(testText, testRules);
      expect(lintRuleServiceCreateMock).toHaveBeenCalled();
      expect(lintResultServiceCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });
});
