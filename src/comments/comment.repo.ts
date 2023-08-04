import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from '../posts/posts.service';
import { CommentsModule } from './comments.module';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel('Comment') private commentsModule: Model<Comment>) {}

  async create(data) {
    const createdComment = await this.commentsModule.create(data);

    const comment = this.commentsModule.aggregate([
      {
        $match: {
          _id: createdComment._id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'commentedBy',
          foreignField: '_id',
          as: 'commentedBy',
        },
      },
      { $unwind: '$commentedBy' },
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'post',
        },
      },
      { $unwind: '$post' },
      {
        $lookup: {
          from: 'users',
          localField: 'post.postedBy',
          foreignField: '_id',
          as: 'post.postedBy',
        },
      },
      { $unwind: '$post.postedBy' },
      {
        $project: {
          _id: 1,
          comment: 1,
          commentedBy: 1,
          postId: {
            _id: '$post._id',
            postTitle: '$post.postTitle',
            postDescription: '$post.postDescription',
            isPublic: '$post.isPublic',
            postedBy: {
              username: '$post.postedBy.username',
              email: '$post.postedBy.email',
            },
          },
        },
      },
    ]);
    return comment;
  }
}
