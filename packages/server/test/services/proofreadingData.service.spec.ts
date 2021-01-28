import { Test } from '@nestjs/testing';
import { LintResultService } from '@/services/lintResult.service';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { ProofreadingDataService } from '@/services/proofreadingData.service';

describe('ProofreadingDataService', () => {
  let proofreadingDataService: ProofreadingDataService;
  let prismaService: PrismaService;
  let userService: UserService;
  let lintResultService: LintResultService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        LintResultService,
        ProofreadingDataService,
        PrismaService,
      ],
    }).compile();

    proofreadingDataService = moduleRef.get<ProofreadingDataService>(
      ProofreadingDataService,
    );
    prismaService = moduleRef.get<PrismaService>(PrismaService);
    userService = moduleRef.get<UserService>(UserService);
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
      const testEmail = 'test@test.com';
      const testReturnUsers = {
        connect: {
          email: testEmail,
        },
      };

      const testReturnExecuteMessages = [
        {
          column: 1,
          index: 1,
          line: 1,
          message: '',
          ruleId: testRules[0],
          severity: 1,
          type: '',
        },
      ];
      const expectedArg = {
        data: {
          text: testText,
          user: testReturnUsers,
          result: {
            create: [
              { column: 1, line: 1, message: '', ruleName: testRules[0] },
            ],
          },
        },
        include: {
          user: true,
          result: true,
        },
      };

      const UserServiceCreateMock = jest.fn(() => testReturnUsers);
      userService['createPrismaDict'] = UserServiceCreateMock;
      const lintResultServiceCreateMock = jest.fn(() =>
        Promise.resolve(testReturnExecuteMessages),
      );
      lintResultService['execute'] = lintResultServiceCreateMock;
      const prismaCreateMock = jest.fn();
      prismaService.proofreadingData['create'] = prismaCreateMock;

      await proofreadingDataService.create(testText, testRules, testEmail);
      expect(UserServiceCreateMock).toHaveBeenCalled();
      expect(lintResultServiceCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });
});
