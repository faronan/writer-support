import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(userEmail: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        ngWords: true,
        templateWords: true,
      },
    });
    return user;
  }

  async create(userEmail: string, userName: string) {
    const user = await this.prismaService.user.create({
      data: {
        email: userEmail,
        name: userName,
      },
    });
    return user;
  }

  createPrismaDict(userEmail: string) {
    const dict = {
      connect: {
        email: userEmail,
      },
    };
    return dict;
  }

  async createNgWord(userEmail: string, wordText: string) {
    const ngWord = await this.prismaService.ngWord.create({
      data: {
        wordText: wordText,
        user: this.createPrismaDict(userEmail),
      },
    });
    return ngWord;
  }

  async createTemplateWord(userEmail: string, wordText: string) {
    const templateWord = await this.prismaService.templateWord.create({
      data: {
        wordText: wordText,
        user: this.createPrismaDict(userEmail),
      },
    });
    return templateWord;
  }

  async deleteNgWord(userEmail: string, wordText: string) {
    const user = await this.findByEmail(userEmail);
    const ngWord = await this.prismaService.ngWord.delete({
      where: {
        userNgWord: {
          wordText: wordText,
          userId: user.id,
        },
      },
    });
    return ngWord;
  }

  async deleteTemplateWord(userEmail: string, wordText: string) {
    const user = await this.findByEmail(userEmail);
    const templateWord = await this.prismaService.templateWord.delete({
      where: {
        userTemplateWord: {
          wordText: wordText,
          userId: user.id,
        },
      },
    });
    return templateWord;
  }
}
