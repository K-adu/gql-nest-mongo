import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repo';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(private postRepo: PostsRepository) {}

  async createPost(currentUser: any, createPostInput: CreatePostInput) {
    const { postTitle, postDescription, isPublic } = createPostInput;
    let id = currentUser._id;
    const data = {
      postTitle,
      postDescription,
      isPublic,
      postedBy: id,
    };
    console.log(data);
    return await this.postRepo.createPost(data);
  }
}
