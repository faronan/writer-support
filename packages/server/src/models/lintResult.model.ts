import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LintResult {
  @Field((_type) => Int)
  resultId: number;
  @Field((_type) => String)
  message: string;
  @Field((_type) => Int)
  line: number;
  @Field((_type) => Int)
  column: number;
}
