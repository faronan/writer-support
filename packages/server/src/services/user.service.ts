import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async create(userEmail: string, userName: string) {
    const dict = {
      connectOrCreate: {
        where: { email: userEmail },
        create: { email: userEmail, name: userName },
      },
    };
    return dict;
  }
}
