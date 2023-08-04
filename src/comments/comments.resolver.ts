import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { CurrentUser } from 'src/auth/current-user';
import { CommentResponse } from './dto/comment-response.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Comment } from './comments.entity';
@Resolver('Comment')
export class CommentsResolver {
  constructor(private commentService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => [Comment])
  async createComment(
    @CurrentUser() CurrentUser,
    @Args('createComment') data: CreateCommentInput,
  ) {
    const variable = await this.commentService.createCommentService(
      CurrentUser,
      data,
    );
    console.log('this is from the resolver', variable);
    return variable;
  }

  // @Query((returns) => String)
  // justtesting() {
  //   return 'hello world';
  // }
}
