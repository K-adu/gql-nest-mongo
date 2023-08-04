import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './dto/user.dto';
import { LoginInput } from './dto/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserType)
  async validateUser(@Args('loginData') data: LoginInput) {
    const { email, username, access_token } =
      await this.authService.validateUser(data);
    return {
      email,
      username,
      access_token,
    };
  }
}
