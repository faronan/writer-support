import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LintRule {
  @Field((_type) => String)
  ruleName: string;
}
