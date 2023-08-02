import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { CommentResponse } from './dto/comment-response.output';
import { CommentsRepository } from './comment.repo';
import { identity } from 'rxjs';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private commentsModule: Model<Comment>,
    private postService: PostsService,
    private commentRepo: CommentsRepository,
  ) {}

  async createCommentService(CurrentUser, createCommentInput) {
    const post = await this.postService.findPostById(createCommentInput.id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    console.log('post=>', post);
    const newComment = {
      comment: createCommentInput.comment,
      postId: createCommentInput.id,
      commentedBy: CurrentUser.id,
    };

    return this.commentRepo.create(newComment);
  }
}
