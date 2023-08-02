import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(data) {
    console.log(data);
    const createdPost = await this.postModel.create(data);
    const post = this.postModel.aggregate([
      {
        $match: {
          _id: createdPost._id,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'postedBy',
          foreignField: '_id',
          as: 'postedBy',
        },
      },
      { $unwind: '$postedBy' },
    ]);
    return post;
  }
}
