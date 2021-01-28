import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProofreadingData } from '@/models/proofreadingData.model';
import { Word } from '@/models/word.model';

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: number;
  name: string;
  email: string;
  @Field((_type) => [ProofreadingData])
  proofreadingDataList: ProofreadingData[];
  @Field((_type) => [Word])
  ngWords: Word[];
  @Field((_type) => [Word])
  templateWords: Word[];
}
