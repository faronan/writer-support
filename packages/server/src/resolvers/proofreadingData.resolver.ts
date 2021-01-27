import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProofreadingData } from '@/models/proofreadingData.model';
import { ProofreadingDataService } from '@/services/proofreadingData.service';
import { AddProofreadingDataInput } from '@/dto/proofreadingData.dto';

@Resolver((of) => ProofreadingData)
export class ProofreadingDataResolver {
  constructor(private proofreadingDataService: ProofreadingDataService) {}

  @Query((returns) => [ProofreadingData])
  async proofreadingDataList() {
    return await this.proofreadingDataService.findMany();
  }

  @Mutation((returns) => ProofreadingData)
  async createProofreading(
    @Args('proofreading') proofreading: AddProofreadingDataInput,
  ) {
    return await this.proofreadingDataService.create(
      proofreading.text,
      proofreading.ruleNames,
      proofreading.userEmail,
      proofreading.userName,
    );
  }
}
