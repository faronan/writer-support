import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LintResult } from './lintResult.model';
import { LintRule } from './lintRule.model';
// import { LintRule } from '@/models/lintRule.model';
// import { LintResult } from '@/models/lintResult.model';

@ObjectType()
export class ProofreadingData {
  @Field((_type) => ID)
  dataId: number;
  text: string;
  rules: LintRule[];
  result: LintResult[];
}
