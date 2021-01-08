import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProofreadingData } from '@/models/proofreadingData.model';

@ObjectType()
export class User {
  @Field((_type) => ID)
  userId: number;
  userName: string;
  userEmail: string;
  @Field((_type) => [ProofreadingData])
  proofreadingDatas: ProofreadingData[];
}
