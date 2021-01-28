import { Test } from '@nestjs/testing';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('findByEmail', () => {
    it('should call prisma user findUnique', async () => {
      const testEmail = 'test@test.com';
      const expectedArg = {
        where: {
          email: testEmail,
        },
        include: {
          ngWords: true,
          templateWords: true,
        },
      };
      const prismaFindUniqueMock = jest.fn();
      prismaService.user['findUnique'] = prismaFindUniqueMock;

      await userService.findByEmail(testEmail);
      expect(prismaFindUniqueMock).toHaveBeenCalled();
      expect(prismaFindUniqueMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });

  describe('create', () => {
    it('should call prisma user create', async () => {
      const testEmail = 'test@test.com';
      const testName = 'testName';

      const expectedArg = {
        data: {
          email: testEmail,
          name: testName,
        },
      };

      const prismaCreateMock = jest.fn();
      prismaService.user['create'] = prismaCreateMock;

      await userService.create(testEmail, testName);
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });

  describe('createPrismaDict', () => {
    it('should return formatted dict for prisma', () => {
      const testEmail = 'test@test.com';
      const expected = {
        connect: {
          email: testEmail,
        },
      };

      const rules = userService.createPrismaDict(testEmail);
      expect(rules).toMatchObject(expected);
    });
  });

  describe('createNgWord', () => {
    it('should call prisma ngWord create', async () => {
      const testEmail = 'test@test.com';
      const testWordText = 'testName';

      const testReturnUsers = {
        connect: {
          email: testEmail,
        },
      };
      const expectedArg = {
        data: {
          wordText: testWordText,
          user: testReturnUsers,
        },
      };

      const prismaCreateMock = jest.fn();
      prismaService.ngWord['create'] = prismaCreateMock;
      const UserServiceCreateMock = jest.fn(() => testReturnUsers);
      userService['createPrismaDict'] = UserServiceCreateMock;

      await userService.createNgWord(testEmail, testWordText);
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });

  describe('createTemplateWord', () => {
    it('should call prisma templateWord create', async () => {
      const testEmail = 'test@test.com';
      const testWordText = 'testName';

      const testReturnUsers = {
        connect: {
          email: testEmail,
        },
      };
      const expectedArg = {
        data: {
          wordText: testWordText,
          user: testReturnUsers,
        },
      };

      const prismaCreateMock = jest.fn();
      prismaService.templateWord['create'] = prismaCreateMock;
      const UserServiceCreateMock = jest.fn(() => testReturnUsers);
      userService['createPrismaDict'] = UserServiceCreateMock;

      await userService.createTemplateWord(testEmail, testWordText);
      expect(prismaCreateMock).toHaveBeenCalled();
      expect(prismaCreateMock.mock.calls[0][0]).toEqual(expectedArg);
    });
  });
});
