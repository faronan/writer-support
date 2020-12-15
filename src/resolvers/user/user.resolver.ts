import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../../models/user.model';
import { PrismaService } from '../../prisma.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => [User])
  async users() {
    return this.prisma.user.findMany();
  }
}
