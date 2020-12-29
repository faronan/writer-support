import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LintRule {
  @Field()
  ruleId: string;
}
