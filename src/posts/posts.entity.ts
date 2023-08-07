import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comments.entity';
//@ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';
export type PostDoccument = Post & Document;

@Schema()
@ObjectType()
export class Post {
  @Prop({
    trim: true,
    required: true,
    type: String,
  })
  @Field()
  postTitle: string;

  @Prop({
    trim: true,
    required: true,
    type: String,
  })
  @Field()
  postDescription: string;

  @Prop({
    trim: true,
    required: true,
    type: Boolean,
    default: false,
  })
  @Field({ nullable: true })
  isPublic: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  postedBy: User;

  @Prop()
  @Field(() => Number, { nullable: true })
  totalComments: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: Buffer })
  @Field(() => GraphQLUpload, { nullable: true })
  image: FileUpload;
}

export const PostSchema = SchemaFactory.createForClass(Post);
