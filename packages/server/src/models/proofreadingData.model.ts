import { ObjectType, Field, ID } from '@nestjs/graphql';
import { LintResult } from '@/models/lintResult.model';
import { User } from '@/models/user.model';

@ObjectType()
export class ProofreadingData {
  @Field((_type) => ID)
  dataId: number;
  text: string;
  @Field((_type) => User)
  user: User;
  @Field((_type) => [LintResult])
  result?: LintResult[];
  created_at: Date;
}
