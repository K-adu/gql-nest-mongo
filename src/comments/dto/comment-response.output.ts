import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Comment } from '../comments.entity';

@ObjectType()
export class CommentResponse extends PartialType(Comment) {
  @Field(() => String)
  _id: string;
}
