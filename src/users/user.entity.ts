import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDoccument = User & Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Prop({
    trim: true,
    required: true,
    type: String,
  })
  @Field()
  username: string;
  @Prop({
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    type: String,
  })
  @Field()
  email: string;

  @Prop({
    required: true,
    minLength: 5,
    type: String,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
