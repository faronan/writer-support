import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;
  @Field({ name: 'registeredAt' })
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  @HideField()
  password: string;
  name?: string;
}
