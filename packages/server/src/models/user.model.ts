import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProofreadingData } from '@/models/proofreadingData.model';

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: number;
  name: string;
  email: string;
  @Field((_type) => [ProofreadingData])
  proofreadingDataList: ProofreadingData[];
}
