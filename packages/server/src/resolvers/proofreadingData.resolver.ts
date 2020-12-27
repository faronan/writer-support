import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProofreadingData } from '../models/proofreadingData.model';
import { PrismaService } from '../prisma.service';

@Resolver((of) => ProofreadingData)
export class ProofreadingDataResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => [ProofreadingData])
  async proofreadingDatas() {
    return this.prisma.proofreadingData.findMany();
  }

  @Mutation((returns) => ProofreadingData)
  async createProofreading(
    @Args({ name: 'text', type: () => String }) text: string,
  ) {
    return this.prisma.proofreadingData.create({ data: { text: text } });
  }
}
