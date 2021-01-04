import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LintResult {
  @Field((_type) => ID)
  resultId: number;
  message: string;
  line: number;
  column: number;
}
