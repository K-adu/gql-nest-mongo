import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Post } from '../posts/posts.entity';
import { User } from '../users/user.entity';

@Schema()
@ObjectType()
export class Comment {
  @Prop({
    required: true,
    type: String,
  })
  @Field()
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @Field()
  commentedBy: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  })
  @Field()
  postId: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
