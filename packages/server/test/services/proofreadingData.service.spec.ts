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
      const testName = 'testName';
      const testReturnUsers = {
        connectOrCreate: {
          where: { email: testEmail },
          create: { email: testEmail, name: testName },
        },
      };

      const testReturnResults = { create: ['testResults'] };
      const expectedArg = {
        data: {
          text: testText,
          user: testReturnUsers,
          result: testReturnResults,
        },
      };

      const UserServiceCreateMock = jest.fn(() =>
        Promise.resolve(testReturnUsers),
      );
      userService['create'] = UserServiceCreateMock;
      const lintResultServiceCreateMock = jest.fn(() =>
        Promise.resolve(testReturnResults),
      );
      lintResultService['create'] = lintResultServiceCreateMock;
      const prismaCreateMock = jest.fn();
      prismaService.proofreadingData['create'] = prismaCreateMock;
      const proofreadingDataTransformMock = jest.fn();
      proofreadingDataService['transform'] = proofreadingDataTransformMock;

      await proofreadingDataService.create(
        testText,
        testRules,
        testEmail,
        testName,
      );
      expect(UserServiceCreateMock).toHaveBeenCalled();
      expect(lintResultServiceCreateMock).toHaveBeenCalled();
      expect(proofreadingDataTransformMock).toHaveBeenCalled();
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });
});
