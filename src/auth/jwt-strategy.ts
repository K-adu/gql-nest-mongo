import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'JWTSECRETKEY',
    });
  }

  public async validate(payload: any) {
    const user = await this.authService.checkUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('user not found with given credentials');
    }

    return user;
  }
}
