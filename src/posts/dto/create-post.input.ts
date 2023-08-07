import { InputType, Int, Field } from '@nestjs/graphql';
//@ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';
@InputType()
export class CreatePostInput {
  @Field(() => String)
  postTitle: string;

  @Field(() => String)
  postDescription: string;

  @Field(() => Boolean)
  isPublic: boolean;
}
