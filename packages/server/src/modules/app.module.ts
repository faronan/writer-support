import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from '@/services/prisma.service';
import { ProofreadingDataResolver } from '@/resolvers/proofreadingData.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService, ProofreadingDataResolver],
})
export class AppModule {}
