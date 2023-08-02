import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
