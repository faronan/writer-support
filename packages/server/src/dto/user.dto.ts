import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindUserArgs {
  @Field((_type) => String)
  userEmail: string;
}

@InputType()
export class AddUserInput {
  @Field((_type) => String)
  userEmail: string;
  @Field((_type) => String)
  userName: string;
}
@InputType()
export class AddUserWordInput {
  @Field((_type) => String)
  userEmail: string;
  @Field((_type) => String)
  wordText: string;
}
