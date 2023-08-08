import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class RemovePost {
  @Field()
  postTitle: string;
}
