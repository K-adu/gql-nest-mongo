import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
//mongodb+srv://yanjishhellscream:nothing@cluster0.whwef4o.mongodb.net/?retryWrites=true&w=majority

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/finaltrydemo'),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      upload: false,
      context: ({ req, res }) => ({ req, res }),

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//this is the commit to the main branch to check just what am i doing
