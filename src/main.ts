import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { MongoExceptionFilter } from './_exception/MongoErrFilter';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  // app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'keyboard cat', // put in env vars
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
}
bootstrap();
