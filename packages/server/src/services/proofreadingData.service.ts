import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/services/prisma.service';
import { UserService } from '@/services/user.service';
import { LintResultService } from '@/services/lintResult.service';
import { ProofreadingData } from '@/models/proofreadingData.model';
import { LintResult } from '@/models/lintResult.model';
import { User } from '@/models/user.model';

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
      },
    );

    // MEMO: prismaService.proofreadingData.createの戻り値にはuserとresultが含まれていない
    // userとresultを入れたProofreadingDataを新たに作成してからクライアントに返す
    const transformProofreadingData = this.transform(
      prismaProofreadingData,
      userEmail,
      userName,
      result['create'],
    );

    return transformProofreadingData;
  }

  private transform = (
    prismaProofreadingData: { dataId: number; text: string; userId: number },
    userEmail: string,
    userName: string,
    result: LintResult[],
  ) => {
    const proofreadingData = new ProofreadingData();
    proofreadingData.dataId = prismaProofreadingData.dataId;
    proofreadingData.text = prismaProofreadingData.text;

    const user = new User();
    user.userId = prismaProofreadingData.userId;
    user.userEmail = userEmail;
    user.userName = userName;
    proofreadingData.user = user;

    proofreadingData.result = result.map((r) => {
      const result = new LintResult();
      result.message = r.message;
      result.ruleName = r.ruleName;
      result.line = r.line;
      result.column = r.column;
      return result;
    });
    return proofreadingData;
  };
}
