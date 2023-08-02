import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PostSchema } from './posts.entity';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsRepository } from './posts.repo';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    UsersModule,
  ],
  providers: [PostsService, PostsResolver, PostsRepository, AuthModule],
})
export class PostsModule {}
