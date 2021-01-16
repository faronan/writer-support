import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProofreadingData } from '@/models/proofreadingData.model';

@ObjectType()
export class LintResult {
  @Field((_type) => ID)
  resultId: number;
  ruleName: string;
  message: string;
  line: number;
  column: number;
  @Field((_type) => [ProofreadingData])
  proofreadingDataList: ProofreadingData[];
}
