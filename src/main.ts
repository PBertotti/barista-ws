import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Swagger API
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Barista Back-end Web-service')
      .setDescription(
        'Documentation for the web-service end-points of the Barista back-end',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .addSecurityRequirements('ApiKeyAuth')
      .build(),
  );
  SwaggerModule.setup('api', app, document);

  await app.listen(3500);
}
bootstrap();
