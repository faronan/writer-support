import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@/models/user.model';
import { Word } from '@/models/word.model';
import { UserService } from '@/services/user.service';
import { AddUserInput, AddUserWordInput, FindUserArgs } from '@/dto/user.dto';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async findUser(@Args('userArgs') userArgs: FindUserArgs) {
    return await this.userService.findByEmail(userArgs.userEmail);
  }

  @Mutation((returns) => User)
  async createUser(@Args('userInput') userInput: AddUserInput) {
    return await this.userService.create(
      userInput.userEmail,
      userInput.userName,
    );
  }

  @Mutation((returns) => Word)
  async createNgWord(@Args('wordInput') wordInput: AddUserWordInput) {
    return await this.userService.createNgWord(
      wordInput.userEmail,
      wordInput.wordText,
    );
  }

  @Mutation((returns) => Word)
  async createTemplateWord(@Args('wordInput') wordInput: AddUserWordInput) {
    return await this.userService.createTemplateWord(
      wordInput.userEmail,
      wordInput.wordText,
    );
  }
}
