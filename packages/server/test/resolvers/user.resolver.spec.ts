import { Test } from '@nestjs/testing';
import { UserResolver } from '@/resolvers/user.resolver';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService, UserResolver],
    }).compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
    userService = moduleRef.get<UserService>(UserService);
  });

  const testEmail = 'test@test.com';
  const testName = 'testName';
  const testWordText = 'testWordText';

  describe('findUser', () => {
    it('should call UserService findByEmail', async () => {
      const UserServiceFindByEmailMock = jest.fn();
      userService['findByEmail'] = UserServiceFindByEmailMock;

      await userResolver.findUser({ userEmail: testEmail });
      expect(UserServiceFindByEmailMock).toHaveBeenCalled();
      expect(UserServiceFindByEmailMock.mock.calls[0][0]).toEqual(testEmail);
    });
  });

  describe('createUser', () => {
    it('should call UserService create', async () => {
      const UserServiceCreateMock = jest.fn();
      userService['create'] = UserServiceCreateMock;

      await userResolver.createUser({
        userEmail: testEmail,
        userName: testName,
      });
      expect(UserServiceCreateMock).toHaveBeenCalled();
      expect(UserServiceCreateMock.mock.calls[0][0]).toEqual(testEmail);
      expect(UserServiceCreateMock.mock.calls[0][1]).toEqual(testName);
    });
  });

  describe('createNgWord', () => {
    it('should call UserService createNgWord', async () => {
      const UserServiceCreateNgWordMock = jest.fn();
      userService['createNgWord'] = UserServiceCreateNgWordMock;

      await userResolver.createNgWord({
        userEmail: testEmail,
        wordText: testWordText,
      });
      expect(UserServiceCreateNgWordMock).toHaveBeenCalled();
      expect(UserServiceCreateNgWordMock.mock.calls[0][0]).toEqual(testEmail);
      expect(UserServiceCreateNgWordMock.mock.calls[0][1]).toEqual(
        testWordText,
      );
    });
  });

  describe('createTemplateWord', () => {
    it('should call UserService createTemplateWord', async () => {
      const UserServiceCreateTemplateWordMock = jest.fn();
      userService['createTemplateWord'] = UserServiceCreateTemplateWordMock;

      await userResolver.createTemplateWord({
        userEmail: testEmail,
        wordText: testWordText,
      });
      expect(UserServiceCreateTemplateWordMock).toHaveBeenCalled();
      expect(UserServiceCreateTemplateWordMock.mock.calls[0][0]).toEqual(
        testEmail,
      );
      expect(UserServiceCreateTemplateWordMock.mock.calls[0][1]).toEqual(
        testWordText,
      );
    });
  });

  describe('deleteNgWord', () => {
    it('should call UserService deleteNgWord', async () => {
      const UserServiceDeleteNgWordMock = jest.fn();
      userService['deleteNgWord'] = UserServiceDeleteNgWordMock;

      await userResolver.deleteNgWord({
        userEmail: testEmail,
        wordText: testWordText,
      });
      expect(UserServiceDeleteNgWordMock).toHaveBeenCalled();
      expect(UserServiceDeleteNgWordMock.mock.calls[0][0]).toEqual(testEmail);
      expect(UserServiceDeleteNgWordMock.mock.calls[0][1]).toEqual(
        testWordText,
      );
    });
  });

  describe('deleteTemplateWord', () => {
    it('should call UserService deleteTemplateWord', async () => {
      const UserServiceDeleteTemplateWordMock = jest.fn();
      userService['deleteTemplateWord'] = UserServiceDeleteTemplateWordMock;

      await userResolver.deleteTemplateWord({
        userEmail: testEmail,
        wordText: testWordText,
      });
      expect(UserServiceDeleteTemplateWordMock).toHaveBeenCalled();
      expect(UserServiceDeleteTemplateWordMock.mock.calls[0][0]).toEqual(
        testEmail,
      );
      expect(UserServiceDeleteTemplateWordMock.mock.calls[0][1]).toEqual(
        testWordText,
      );
    });
  });
});
