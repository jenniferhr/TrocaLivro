import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false, // Retorna 404 se o payload não atender as regras do DTO
      whitelist: true, // Remove campos que não estão no DTO
      transform: true, // Transforma os campos para o tipo especificado no DTO
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('TrocaLivro API')
    .setDescription(
      'API for TrocaLivro, a platform where users can trade books with each other.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
