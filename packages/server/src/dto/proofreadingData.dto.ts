import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddProofreadingDataInput {
  @Field((_type) => String)
  text: string;
  @Field((_type) => String)
  userEmail: string;
  @Field((_type) => String)
  userName: string;
  @Field((_type) => [String])
  ruleNames: string[];
}
