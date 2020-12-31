import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LintRule } from '@/models/lintRule.model';
import { LintResult } from '@/models/lintResult.model';

@ObjectType()
export class ProofreadingData {
  @Field((_type) => ID)
  dataId: number;
  text: string;
  rules: LintRule[];
  result: LintResult[];
}
