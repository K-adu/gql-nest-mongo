import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsService } from '../posts/posts.service';
import { CommentsModule } from './comments.module';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel('Comment') private commentsModule: Model<Comment>) {}

  async create(data) {
    const createdComment = await this.commentsModule.create(data);

    const comment = await this.commentsModule.aggregate([
      {
        $match: {
          _id: createdComment._id,
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'postId',
          foreignField: '_id',
          as: 'postId',
        },
      },
      { $unwind: '$postId' },
    ]);
    return comment;
  }
}
