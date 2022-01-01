import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { IoSocketAdapter } from './ws.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3500',
      'ws://localhost:3505',
      'ws://localhost:3506',
    ],
  });

  app.use(cookieParser());

  app.useWebSocketAdapter(new IoSocketAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Pinterest MVC')
    .setDescription('Pinterest application only in backend version')
    .setVersion('2.0')
    .addTag('Pinterest')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3500);
}

bootstrap();
