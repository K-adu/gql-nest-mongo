import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './posts.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePostInput } from './dto/create-post.input';
import { stripIgnoredCharacters } from 'graphql';
import { stringify } from 'querystring';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(data) {
    console.log(data);
    const createdPost = await this.postModel.create(data);
    const post = await this.postModel
      .aggregate([
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
      ])
      .exec();
    console.log(post);
    return post;
  }

  async findPostById(id) {
    return await this.postModel.findById(id);
  }
  async getPosts() {
    const post = await this.postModel.aggregate([
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
  async findAllPosts() {
    const post = await this.postModel.aggregate([
      // {
      //   $match: {
      //     $isPublic: { $eq: true },
      //   },
      // },
      {
        $lookup: {
          from: 'users',
          let: { userId: '$postedBy' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$_id', '$$userId'],
                    },
                  ],
                },
              },
            },
          ],
          as: 'postedBy',
        },
      },
      { $unwind: '$postedBy' },
      {
        $lookup: {
          from: 'comments',
          let: { post_Id: '$_id' },
          pipeline: [{ $match: { $expr: { $eq: ['$$post_Id', '$postId'] } } }],
          as: 'totalComments',
        },
      },
      { $addFields: { totalComments: { $size: '$totalComments' } } },
      {
        //stage3 to get comment  details
        $lookup: {
          from: 'comments',
          let: { post_Id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        '$postId',
                        '$$post_Id' /*declared varaible form let */,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $limit: 5,
            },
            {
              $lookup: {
                from: 'users',
                let: { user_Id: '$commentedBy' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $and: [{ $eq: ['$_id', '$$user_Id'] }] },
                    },
                  },
                ],
                as: 'commentedBy',
              },
            },
            { $unwind: '$commentedBy' },
          ],
          as: 'comments',
        },
      },
    ]);
    return post;
  }

  async updateBlogRepository(postId, body) {
    return await this.postModel.findByIdAndUpdate(postId, body);
  }

  async findLoggedInUserPost(data) {
    return await this.postModel.findOne({
      _id: data.postId,
      postedBy: data.userId,
    });
  }

  async remove(userId, id) {
    id = new mongoose.Types.ObjectId(id);
    const post = await this.postModel.findById(id);
    console.log(post);
    if (!post) {
      throw new NotFoundException('The post doesnot exist or is deleted ');
    }
    console.log('this is from the repositoyry;', post);
    const uploadedBytostring = post.postedBy.toString();
    const userIdtoString = userId.toString();
    console.log(uploadedBytostring, userIdtoString);
    if (uploadedBytostring !== userIdtoString) {
      throw new UnauthorizedException(
        'you are not authorized to delete this post',
      );
    }
    return await this.postModel.findByIdAndDelete(id);
  }
}
