import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/current-user';
import { PostResponse } from './dto/response-post.output';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver('Post')
export class PostsResolver {
  constructor(private postService: PostsService) {}

  //create post
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() currentUser,
    @Args('createPost') data: CreatePostInput,
  ) {
    this.postService.createPost(currentUser, data);

    // const [post] = await this.postService.createPost(currentUser, data);
    // return post;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  async getPosts() {
    const post = await this.postService.getPosts();
    console.log(post);
    return post;
  }
  @UseGuards(JwtAuthGuard)
  @Query(() => [PostResponse], { name: 'posts' })
  async findAll() {
    const post = await this.postService.findAll();
    console.log('posts list =>', post);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @CurrentUser() currentUser: any,
    @Args('updatePost') data: UpdatePostInput,
  ) {
    return this.postService.updatePost(data, currentUser);
  }
  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => Post)
  // updatePost(
  //   @CurrentUser() CurrentUser: any,
  //   @Args('updatePostInput') updatePostInput: UpdatePostInput,
  // ) {
  //   return this.postService.update(CurrentUser, updatePostInput);
  // }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  removePost(@CurrentUser() CurrentUser: any, @Args('id') id: string) {
    return this.postService.remove(CurrentUser, id);
  }
}
