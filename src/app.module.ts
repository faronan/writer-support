import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
@Module({
  imports: [GraphQLModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
