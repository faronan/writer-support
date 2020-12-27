import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LintResult } from './lintResult.model';
import { LintRule } from './lintRule.model';
// import { LintRule } from '@/models/lintRule.model';
// import { LintResult } from '@/models/lintResult.model';

@ObjectType()
export class ProofreadingData {
  @Field((_type) => Int)
  dataId: number;
  @Field((_type) => String)
  text: string;
  @Field((_type) => LintRule)
  rules: LintRule[];
  @Field((_type) => LintResult)
  result: LintResult[];
}
