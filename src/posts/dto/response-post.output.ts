import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Post } from '../posts.entity';
import { Comment } from '../../comments/comments.entity';

@ObjectType()
export class PostResponse extends Post {
  @Field(() => String)
  _id: string;

  @Field(() => Number, { nullable: true })
  totalComments: number;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
