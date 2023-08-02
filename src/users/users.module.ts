import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSchema } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './users.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService, UsersResolver, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
