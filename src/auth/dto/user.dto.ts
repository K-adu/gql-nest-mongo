import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/user.entity';

@ObjectType()
export class UserType {
  @Field(() => User)
  user: User;
  @Field()
  access_token: string;
}
