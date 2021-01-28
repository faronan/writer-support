import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProofreadingDataModule } from '@/modules/proofreadingData.module';
import { UserModule } from '@/modules/user.module';

@Module({
  imports: [
    ProofreadingDataModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
