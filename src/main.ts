import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // const config = new DocumentBuilder()
  //   .setTitle('Safety4All API Documentation')
  //   .setDescription('Safety4All Manager sAPI')
  //   .setVersion('1.0')
  //   .addBearerAuth({
  //     type: 'apiKey',
  //     scheme: 'Bearer',
  //     bearerFormat: 'Bearer',
  //     name: 'Authorization',
  //     in: 'header',
  //   })
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);

  const port = process.env.APP_PORT;

  await app.listen(port);
}
bootstrap();
