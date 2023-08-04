import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { passwordHash } from 'src/utils/cryptography';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data) {
    console.log(data);
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) {
      throw new NotFoundException(
        'The user with the provided email doesnot exist',
      );
    }

    const validPassword = passwordHash.from(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Given password is incorrect');
    }

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const email = data.email;
    const username = user.username;

    return {
      email,
      username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async checkUserById(id) {
    return this.userService.findUserById(id);
  }
}
