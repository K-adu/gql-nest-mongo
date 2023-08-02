import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { Post } from '../posts.entity';
import { Comment } from '../../comments/comments.entity';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { CreatePostInput } from "./create-post.input";
// import mongoose from "mongoose";

@ObjectType()
export class PostResponse extends PartialType(Post) {
  @Field(() => String)
  _id: string;

  @Field(() => Number, { nullable: true })
  totalComments: number;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
