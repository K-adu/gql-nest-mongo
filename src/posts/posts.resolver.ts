import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/current-user';
import { PostResponse } from './dto/response-post.output';
import { UpdatePostInput } from './dto/update-post.input';

//@ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';
@Resolver('Post')
export class PostsResolver {
  constructor(private postService: PostsService) {}

  //create post
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() currentUser,
    @Args('createPost') data: CreatePostInput,

    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    let readStream = file.createReadStream();
    let dataImage = '';

    //setting stream encoidng to binary so the chunks are kept in binary
    readStream.setEncoding('binary');
    readStream.once('error', (err) => {
      return console.log(err);
    });
    readStream.on('data', (chunk) => (dataImage += chunk));
    readStream.on('end', () => {
      // If you need the binary data as a Buffer
      // create one from data chunks
      console.log(Buffer.from(dataImage, 'binary'));
      this.postService.createPost(
        currentUser,
        data,
        Buffer.from(dataImage, 'binary'),
      );
    });

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

  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => Post)
  // removePost(@CurrentUser() CurrentUser: any, @Args('id') id: string) {
  //   return this.postService.remove(CurrentUser, id);
}
