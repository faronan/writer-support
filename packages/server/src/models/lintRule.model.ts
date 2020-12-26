import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LintRule {
  @Field((_type) => String)
  ruleId: string;
  @Field((_type) => Boolean)
  isValid: boolean;
}
