import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as env from 'env-var';
import { ResponseMessages } from './models/ResponseMessages';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle(ResponseMessages.SWAGGER_TITLE)
  .setDescription(
    `${ResponseMessages.SWAGGER_TITLE} ${ResponseMessages.SWAGGER_DESCRIPTION}`,
  )
  .setVersion(ResponseMessages.SWAGGER_VERSION)
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  const port = env.get('APP_PORT').default(3000).asPortNumber();
  await app.listen(port);
}
bootstrap();
