import { Test } from '@nestjs/testing';
import { ProofreadingDataResolver } from '@/resolvers/proofreadingData.resolver';
import { LintResultService } from '@/services/lintResult.service';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { ProofreadingDataService } from '@/services/proofreadingData.service';

describe('ProofreadingDataResolver', () => {
  let proofreadingDataResolver: ProofreadingDataResolver;
  let proofreadingDataService: ProofreadingDataService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        LintResultService,
        ProofreadingDataService,
        PrismaService,
        ProofreadingDataResolver,
      ],
    }).compile();

    proofreadingDataResolver = moduleRef.get<ProofreadingDataResolver>(
      ProofreadingDataResolver,
    );
    proofreadingDataService = moduleRef.get<ProofreadingDataService>(
      ProofreadingDataService,
    );
  });

  describe('proofreadingDataList', () => {
    it('should call ProofreadingDataService findMany', async () => {
      const proofreadingDataServiceFindManyMock = jest.fn();
      proofreadingDataService['findMany'] = proofreadingDataServiceFindManyMock;

      await proofreadingDataResolver.proofreadingDataList();
      expect(proofreadingDataServiceFindManyMock).toHaveBeenCalled();
    });
  });

  describe('createProofreading', () => {
    it('should call ProofreadingDataService create', async () => {
      const proofreading = {
        text: 'testText',
        ruleNames: ['testRuleName'],
        userEmail: 'test@test.com',
        userName: 'testName',
      };
      const proofreadingDataServiceCreateMock = jest.fn();
      proofreadingDataService['create'] = proofreadingDataServiceCreateMock;

      await proofreadingDataResolver.createProofreading(proofreading);
      expect(proofreadingDataServiceCreateMock).toHaveBeenCalled();
      expect(proofreadingDataServiceCreateMock.mock.calls[0][0]).toEqual(
        proofreading.text,
      );
      expect(proofreadingDataServiceCreateMock.mock.calls[0][1]).toEqual(
        proofreading.ruleNames,
      );
    });
  });
});
