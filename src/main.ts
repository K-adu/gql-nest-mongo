import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//@ts-ignore
const { graphqlUploadExpress } = require('graphql-upload');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(graphqlUploadExpress());
  // app.disable('x-powered-by');
  await app.listen(4000);
}
bootstrap();
