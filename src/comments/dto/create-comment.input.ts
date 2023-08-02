import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  comment: string;
}
