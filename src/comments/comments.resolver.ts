import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { CurrentUser } from 'src/auth/current-user';
import { CommentResponse } from './dto/comment-response.output';

@Resolver()
export class CommentsResolver {
  constructor(private commentService: CommentsService) {}

  @Mutation(() => CommentResponse)
  async createComment(
    @CurrentUser() CurrentUser,
    @Args('createComment') data: CreateCommentInput,
  ) {
    return this.commentService.createCommentService(CurrentUser, data);
  }
}
