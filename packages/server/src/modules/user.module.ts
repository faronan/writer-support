import { Module } from '@nestjs/common';
import { UserResolver } from '@/resolvers/user.resolver';
import { PrismaService } from '@/services/prisma.service';
import { UserService } from '@/services/user.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService, PrismaService, UserResolver],
})
export class UserModule {}
