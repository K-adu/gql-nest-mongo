import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') data: CreateUserInput) {
    console.log(data);
    return this.userService.create(data);
  }

  @Query(() => User)
  async tryQuery() {
    return {
      username: 'manish',
      email: 'this is working too',
      password: ' nothing',
    };
  }
}
