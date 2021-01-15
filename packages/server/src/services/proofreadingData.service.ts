import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { UserService } from '@/services/user.service';
import { LintResultService } from '@/services/lintResult.service';

@Injectable()
export class ProofreadingDataService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private resultService: LintResultService,
  ) {}

  async findMany() {
    return await this.prismaService.proofreadingData.findMany({
      include: {
        user: true,
        result: true,
      },
    });
  }

  async create(
    text: string,
    ruleNames: string[],
    userEmail: string,
    userName: string,
  ) {
    const user = await this.userService.create(userEmail, userName);
    const result = await this.resultService.create(text, ruleNames);
    const prismaProofreadingData = await this.prismaService.proofreadingData.create(
      {
        data: { text: text, user: user, result: result },
        include: {
          user: true,
          result: true,
        },
      },
    );

    return prismaProofreadingData;
  }
}
