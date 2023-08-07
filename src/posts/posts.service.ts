import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './posts.repo';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  constructor(private postRepo: PostsRepository) {}

  async createPost(currentUser: any, createPostInput: CreatePostInput, file) {
    const { postTitle, postDescription, isPublic } = createPostInput;
    let id = currentUser._id;
    const data = {
      postTitle,
      postDescription,
      isPublic,
      postedBy: id,
      image: Buffer.from(file).toString('base64'),
    };
    console.log('this is the data from the post service', data);
    return await this.postRepo.createPost(data);
  }

  async findPostById(id) {
    return this.postRepo.findPostById(id);
  }
  async getPosts() {
    return await this.postRepo.getPosts();
  }
  async findAll() {
    return await this.postRepo.findAllPosts();
  }
  async updatePost(body: any, currentUser) {
    const data = {
      postId: body.id,
      userId: currentUser._id,
    };
    const post = await this.postRepo.findLoggedInUserPost(data);
    if (!post) {
      return 'the blog doesnot exist or unauthorized to perform the action';
    }
    return await this.postRepo.updateBlogRepository(data.postId, body);
  }
}
