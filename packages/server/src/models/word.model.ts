import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field((_type) => ID)
  wordId: number;
  @Field((_type) => String)
  wordText: String;
  userId: number;
}
