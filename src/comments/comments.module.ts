import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PostsModule } from 'src/posts/posts.module';
import { CommentSchema } from './comments.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsRepository } from './comment.repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    PostsModule,
  ],
  providers: [CommentsService, CommentsResolver, CommentsRepository],
})
export class CommentsModule {}
