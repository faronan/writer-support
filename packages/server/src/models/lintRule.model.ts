import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LintRule {
  @Field((_type) => ID)
  ruleId: number;
  @Field((_type) => String)
  ruleName: string;
}
