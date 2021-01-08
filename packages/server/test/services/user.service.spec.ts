import { Test } from '@nestjs/testing';
import { UserService } from '@/services/user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should return formated dict for prisma', async () => {
      const testEmail = 'test@test.com';
      const testName = 'testName';
      const expected = {
        connectOrCreate: {
          where: { email: testEmail },
          create: { email: testEmail, name: testName },
        },
      };

      const rules = await userService.create(testEmail, testName);
      expect(rules).toMatchObject(expected);
    });
  });
});
